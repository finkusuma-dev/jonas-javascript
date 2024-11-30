import icons from 'url:../../img/icons.svg';
import type { ControlPaginationFn, PaginateData } from '../lib/types';
import View from './View';
import { RESULT_PER_PAGE } from '../config';

class PaginationView extends View<PaginateData<unknown>> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.pagination')!;

  protected override _generateMarkup(): string {
    this.clear();

    let markup = '';

    /// Previous button markup
    if (!this.#isFirstPage) {
      const prevBtnMarkup = `<button data-goto="${
        this.#prevPage
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this.#prevPage}</span>
        </button>`;

      markup = prevBtnMarkup;
      //this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    /// Next button markup
    if (!this.#isLastPage) {
      const nextBtnMarkup = `<button data-goto="${
        this.#nextPage
      }" class="btn--inline pagination__btn--next">
          <span>Page ${this.#nextPage}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;

      markup += nextBtnMarkup;
    }
    return markup;
  }

  addHandlerClick(handler: ControlPaginationFn) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target) return;

      const btn: HTMLElement | null = (e.target as Element).closest(
        '.btn--inline'
      );

      if (!btn) return;

      const goToPage = +(btn.dataset.goto ?? '0');

      if (!goToPage) return;

      handler(goToPage);
    });
  }

  get #prevPage() {
    return !this.#isFirstPage ? this._data.page - 1 : 1;
  }

  get #nextPage() {
    return !this.#isLastPage ? this._data.page + 1 : this._data.page;
  }

  get #isFirstPage() {
    return this._data.page === 1;
  }

  get #isLastPage() {
    return this._data.items
      ? Math.ceil(this._data.items?.length / RESULT_PER_PAGE) ===
          this._data.page
      : true;
  }
}

export default new PaginationView();
