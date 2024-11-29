import icons from 'url:../../img/icons.svg';
import View from './View';
import * as model from '../model';
import { RESULT_PER_PAGE } from '../config';

class SearchResultsView extends View<model.Recipe[]> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.results')!;
  protected override _errorMessage: string =
    'Recipes are not found for your query! Please try again:)';

  protected override _generateMarkup() {
    // console.log('generateMarkup', this._data);
    return (
      this._data
        .map(res => this.#generateMarkupResult(res))
        .join('') ?? ''
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

  #generateMarkupResult(recipe: model.Recipe) {
    const hashId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          hashId === recipe.id ? 'preview__link--active' : ''
        }" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${
              recipe.publisher
            }</p>            
          </div>
        </a>
      </li>`;
  }
}

export default new SearchResultsView();
