import icons from 'url:../../img/icons.svg';
import View from './View';
import * as model from '../model';
import { RESULT_PER_PAGE } from '../config';

class SearchResultsView extends View<model.Recipe[]> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.results')!;
  #paginationContainer: HTMLElement =
    document.querySelector('.pagination')!;
  #page: number = 1;

  override render(data?: model.Recipe[]) {
    // console.log('render data', data);
    this._data = data ?? [];
    this.renderPage(1);
  }

  renderPage(pageNumber: number) {
    // console.log('renderPage');
    this.#page = pageNumber;

    // console.dir(
    //   this.#getPaginationStartNumber(),
    //   this.#getPaginationEndNumber()
    // );

    const renderResults = this._data?.slice(
      this.#getPaginationStartNumber(),
      this.#getPaginationEndNumber() + 1
    );

    const markup = this._generateMarkup(renderResults);

    this._parentElement.innerHTML = markup;

    this.#renderPagination();
  }

  #renderPagination() {
    this.#paginationContainer.innerHTML = '';

    if (!this.#isFirstPage) {
      const markup = `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.#getPrevPage()}</span>
          </button>`;
      this.#paginationContainer.insertAdjacentHTML(
        'afterbegin',
        markup
      );
      (
        this.#paginationContainer.querySelector(
          '.pagination__btn--prev'
        ) as HTMLElement
      ).addEventListener('click', () => {
        this.renderPage(this.#getPrevPage());
      });
    }

    if (!this.#isLastPage) {
      const markup = `<button class="btn--inline pagination__btn--next">
            <span>Page ${this.#getNextPage()}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
      this.#paginationContainer.insertAdjacentHTML(
        'beforeend',
        markup
      );
      (
        this.#paginationContainer.querySelector(
          '.pagination__btn--next'
        ) as HTMLElement
      ).addEventListener('click', () => {
        this.renderPage(this.#getNextPage());
      });
    }
  }

  get #isFirstPage(): boolean {
    return this.#page === 1;
  }

  get #isLastPage(): boolean {
    return this._data
      ? this.#page === Math.ceil(this._data?.length / RESULT_PER_PAGE)
      : true;
  }

  #getPaginationStartNumber() {
    return (this.#page - 1) * RESULT_PER_PAGE;
  }
  #getPaginationEndNumber() {
    return this.#page * RESULT_PER_PAGE - 1;
  }

  #getPrevPage(): number {
    return this.#isFirstPage ? 1 : this.#page - 1;
  }
  #getNextPage(): number {
    return this.#isLastPage ? this.#page : this.#page + 1;
  }

  protected override _generateMarkup(results?: model.Recipe[]) {
    return (
      results?.map(res => this.#generateMarkupResult(res)).join('') ??
      ''
    );
  }

  #generateMarkupResult(recipe: model.Recipe) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>            
          </div>
        </a>
      </li>`;
  }
}

export default new SearchResultsView();
