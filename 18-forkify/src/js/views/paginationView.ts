import icons from 'url:../../img/icons.svg';
import * as types from '../lib/types';
import * as model from '../model';
import View from './View';

class PaginationView extends View<model.Pagination> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.pagination')!;

  protected override _generateMarkup(): string {
    this.clear();

    let markup = '';

    /// Previous button markup
    if (this._data.page > 1) {
      const prevBtnMarkup = `<button data-goto="${this.#getPrevPage()}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this.#getPrevPage()}</span>
        </button>`;

      markup = prevBtnMarkup;
      //this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    /// Next button markup
    if (!this._data.isLastPage) {
      const nextBtnMarkup = `<button data-goto="${this.#getNextPage()}" class="btn--inline pagination__btn--next">
          <span>Page ${this.#getNextPage()}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;

      markup += nextBtnMarkup;
    }
    return markup;
  }

  addHandlerPagination(handler: (page: number) => void) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target) return;

      const btn: HTMLElement | null = (e.target as Element).closest(
        '.btn--inline'
      );

      if (!btn) return;

      const goToPage = Number.parseInt(btn.dataset.goto ?? '0');
      console.log({ goToPage });

      if (!goToPage) return;

      handler(goToPage);
    });
  }

  #getPrevPage() {
    return this._data.page > 1 ? this._data.page - 1 : 1;
  }

  #getNextPage() {
    return !this._data.isLastPage
      ? this._data.page + 1
      : this._data.page;
  }
}

export default new PaginationView();
