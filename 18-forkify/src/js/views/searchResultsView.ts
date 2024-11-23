import icons from 'url:../../img/icons.svg';
import * as model from '../model';
import { RESULT_PER_PAGE } from '../config';

class SearchResultsView {
  #parentElement: HTMLElement = document.querySelector('.search-results')!;
  #paginationContainer: HTMLElement = document.querySelector('.pagination')!;
  #page: number = 1;
  #data?: model.Recipe[];

  render(data?: model.Recipe[]) {
    // console.log('render Results');
    this.#data = data;
    this.renderPage(1);
  }

  renderPage(pageNumber: number) {
    this.#page = pageNumber;

    console.dir(
      this.#getPaginationStartNumber(),
      this.#getPaginationEndNumber()
    );

    const renderResults = this.#data?.slice(
      this.#getPaginationStartNumber(),
      this.#getPaginationEndNumber() + 1
    );

    console.dir(renderResults);

    const markup = this.#generateMarkup(renderResults);

    const searchResultsContainer: HTMLElement =
      this.#parentElement.querySelector('.results')!;

    searchResultsContainer.innerHTML = markup;

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
      this.#paginationContainer.insertAdjacentHTML('afterbegin', markup);
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
      this.#paginationContainer.insertAdjacentHTML('beforeend', markup);
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
    return this.#data
      ? this.#page === Math.ceil(this.#data?.length / RESULT_PER_PAGE)
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

  #generateMarkup(results?: model.Recipe[]) {
    return results?.map(res => this.#generateMarkupResult(res)).join('') ?? '';
  }

  #generateMarkupResult(recipe: model.Recipe) {
    return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export default new SearchResultsView();
