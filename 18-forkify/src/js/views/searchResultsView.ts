import icons from 'url:../../img/icons.svg';
import View from './View';
import * as model from '../model';
import RecipePreview from './RecipePreview';

class SearchResultsView extends View<model.Recipe[]> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.results')!;
  protected override _errorMessage: string =
    'Recipes are not found for your query! Please try again:)';

  protected override _generateMarkup() {
    // console.log('generateMarkup', this._data);
    return (
      this._data.map(res => RecipePreview.render(res)).join('') ?? ''
    );
  }

  renderActiveResult() {
    const hashId = window.location.hash;

    const elms =
      this._parentElement.querySelectorAll('.preview__link');
    elms.forEach(elm => {
      elm.classList.remove('preview__link--active');
      if (elm.attributes['href'].value === hashId) {
        elm.classList.add('preview__link--active');
        return;
      }
    });
  }
}

export default new SearchResultsView();
