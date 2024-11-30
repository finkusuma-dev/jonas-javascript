import icons from 'url:../../img/icons.svg';
import * as model from '../model';
import View from './View';
import { type ControlBookmarkFn } from '../controller';

class BookmarksView extends View<model.Recipe[]> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.bookmarks__list')!;

  protected override _defaultMessage: string =
    'No bookmarks yet. Find a nice recipe and bookmark it :)';

  protected override _generateMarkup(): string {
    return this._data
      .map(bookmark => this.#generateMarkupBookmark(bookmark))
      .join('');
  }

  addHandlerRender(handler: ControlBookmarkFn) {
    window.addEventListener('load', e => {
      handler(true);
    });
  }

  #generateMarkupBookmark(bookmark: model.Recipe) {
    const hashId = document.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          hashId === bookmark.id ? 'preview__link--active' : ''
        }" href="#${bookmark.id}">
          <figure class="preview__fig">
            <img src="${bookmark.image}" alt="${bookmark.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${bookmark.title}</h4>
            <p class="preview__publisher">${bookmark.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new BookmarksView();
