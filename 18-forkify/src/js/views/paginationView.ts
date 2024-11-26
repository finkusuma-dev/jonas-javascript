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
    if (this._data.page > 1) {
      const prevBtnMarkup = `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.#getPrevPage()}</span>
          </button>`;

      markup = prevBtnMarkup;
      //this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    if (!this._data.isLastPage) {
      const nextBtnMarkup = `<button class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${this.#getNextPage()}</span>
          </button>`;

      markup += nextBtnMarkup;
    }
    return markup;
  }

  addHandlerPagination(
    handler: (direction: types.PageDirection) => void
  ) {
    (
      this._parentElement.querySelector(
        '.pagination__btn--prev'
      ) as HTMLElement
    )?.addEventListener('click', () => {
      handler('prev');
    });

    (
      this._parentElement.querySelector(
        '.pagination__btn--next'
      ) as HTMLElement
    )?.addEventListener('click', () => {
      handler('next');
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
