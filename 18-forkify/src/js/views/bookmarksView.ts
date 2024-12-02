import icons from 'url:../../img/icons.svg';
import * as model from '../model';
import View from './View';
import { type ControlBookmarkFn } from '../controller';
import RecipePreview from './RecipePreview';

class BookmarksView extends View<model.Recipe[]> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.bookmarks__list')!;

  protected override _defaultMessage: string =
    'No bookmarks yet. Find a nice recipe and bookmark it :)';

  protected override _generateMarkup() {
    if (!this._data) return '';

    return this._data
      .map(bookmark => RecipePreview.render(bookmark))
      .join('');
  }

  addHandlerRender(handler: ControlBookmarkFn) {
    window.addEventListener('load', e => {
      handler();
    });
  }
}

export default new BookmarksView();
