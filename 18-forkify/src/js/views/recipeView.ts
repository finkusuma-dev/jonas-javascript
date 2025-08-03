// import icons from '../img/icons.svg'; /// parcel v1
import icons from 'url:../../img/icons.svg'; /// parcel v2 => icons = path to the dist svg file.
import fracty from 'fracty';
import * as model from '../model';
import type {
  ControlBookmarkFn,
  changeRecipeServingsFn,
} from '../controller';
import View from './View';

const securityElement = document.createElement('div');
/// Security function
function escapeHTML(input: string) {
  securityElement.textContent = input;
  return securityElement.innerHTML;
}

class RecipeView extends View<model.Recipe> {
  protected override _parentElement: HTMLElement =
    document.querySelector('.recipe')!;

  protected override _errorMessage =
    'No recipes found for your query. Please try again!';
  protected override _defaultMessage =
    'Start by searching for a recipe or an ingredient. Have fun!';

  bindRender(handler: () => void) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  bindBookmark(handler: ControlBookmarkFn) {
    this._parentElement
      // .querySelector<HTMLElement>('.btn--bookmark')!
      .addEventListener('click', e => {
        if (!e.target) return;

        const btn = (e.target as Element).closest<HTMLElement>(
          '.btn--bookmark'
        );
        if (!btn) return;

        handler(true);
      });
  }

  bindChangeServings(handler: changeRecipeServingsFn) {
    this._parentElement
      // .querySelector<HTMLElement>('.recipe__info-buttons')!
      .addEventListener('click', e => {
        if (!e.target) return;

        const btn = (e.target as Element).closest<HTMLElement>(
          '.btn--update-servings'
        );
        if (!btn) return;

        /// Change servings
        const newServings = +(btn.dataset.updateTo ?? 0);

        handler(newServings);
      });
  }

  renderServings(data: model.Recipe) {
    this._data = data;

    /// Render servings
    const servingsEl = this._parentElement.querySelector<HTMLElement>(
      '.recipe__info-data--people'
    )!;
    servingsEl.textContent = this._data.servings!.toString();

    /// Render ingredients
    const ingredientsContainer = this._parentElement.querySelector(
      '.recipe__ingredient-list'
    )!;

    ingredientsContainer.innerHTML = this._data
      .ingredients!.map(ing => this.#generateMarkupIngredient(ing))
      .join('');

    /// Update buttons dataset
    const btns = this._parentElement.querySelectorAll<HTMLElement>(
      '.btn--update-servings'
    );

    btns.forEach(btn => {
      // btn.dataset.updateTo = '1';
      if (btn.classList.contains('btn--decrease-servings')) {
        btn.dataset.updateTo =
          this._data!.servings! > 1
            ? (this._data!.servings! - 1).toString()
            : '1';
      }
      if (btn.classList.contains('btn--increase-servings')) {
        btn.dataset.updateTo = (this._data!.servings! + 1).toString();
      }
    });
  }

  protected override _generateMarkup() {
    if (!this._data) return '';

    return `
    <figure class="recipe__fig">
        <img src="${
          this._data.image
        }" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${escapeHTML(
            this._data.cookingTime?.toString() || ''
          )}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${escapeHTML(
            this._data.servings?.toString() || ''
          )}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings btn--decrease-servings" data-update-to="${
              this._data.servings! > 1
                ? this._data.servings! - 1
                : this._data.servings!
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings btn--increase-servings" data-update-to="${
              this._data.servings! + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>


        <div class="recipe__user-generated ${
          this._data.key ? '' : 'hidden'
        }">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }">
            </use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data
            .ingredients!.map(ing =>
              this.#generateMarkupIngredient(ing)
            )
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${escapeHTML(
            this._data.publisher
          )}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${escapeHTML(
          this._data.sourceUrl || ''
        )}"
          target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  #generateMarkupIngredient(ing: model.Ingredient) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${escapeHTML(
        fracty(ing.quantity)
      )}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${escapeHTML(ing.unit)}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
