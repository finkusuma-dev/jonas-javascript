// import icons from '../img/icons.svg'; /// parcel v1
import icons from 'url:../../img/icons.svg'; /// parcel v2 => icons = path to the dist svg file.
import fracty from 'fracty';
import * as model from '../model';

const securityElement = document.createElement('div');
/// Security function
function escapeHTML(input) {
  securityElement.textContent = input;
  return securityElement.innerHTML;
}

class RecipeView {
  #parentElement: HTMLElement = document.querySelector('.recipe')!;
  #data: model.Recipe;
  #errorMessage = 'No recipes found for your query. Please try again!';

  render(data: model.Recipe) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.innerHTML = markup;
  }

  addHandlerRender(handler: (id: string) => void) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, function () {
        const hashId = this.window.location.hash.slice(1);

        // console.log(hashId);
        if (!hashId) return;
        handler(hashId);
      });
    });
  }

  renderError(message: string = this.#errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this.#parentElement.innerHTML = markup;
  }
  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;
    this.#parentElement.innerHTML = markup;
  }

  #generateMarkup() {
    return `
    <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${escapeHTML(
            this.#data.cookingTime
          )}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${escapeHTML(
            this.#data.servings
          )}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.#data.ingredients
            .map(ing => this.#generateMarkupIngredient(ing))
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${escapeHTML(
            this.#data.publisher
          )}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${escapeHTML(
          this.#data.sourceUrl
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

  #generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${fracty(escapeHTML(ing.quantity))}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${escapeHTML(ing.unit)}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
