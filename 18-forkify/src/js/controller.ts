// import icons from '../img/icons.svg'; /// parcel v1
import icons from 'url:../img/icons.svg'; /// parcel v2 => icons = path to the dist svg file.
// console.dir(icons);

const recipeContainer: HTMLElement = document.querySelector('.recipe')!;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

type Ingredient = {
  quantity: number;
  unit: string;
  description: string;
};
type Recipe = {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
};

const securityElement = document.createElement('div');
/// Security function
function escapeHTML(input) {
  securityElement.textContent = input;
  return securityElement.innerHTML;
}

const renderSpinner = function (parentElement: HTMLElement) {
  const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>`;
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  recipeContainer.innerHTML = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;

  try {
    /// 1. Getting recipe
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    // console.dir(res);
    const data = await res.json();
    // console.dir(data);
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    const { recipe: recipeRaw } = data.data;
    const recipe: Recipe = {
      id: recipeRaw.id,
      title: recipeRaw.title,
      publisher: recipeRaw.publisher,
      sourceUrl: recipeRaw.source_url,
      image: recipeRaw.image_url,
      servings: recipeRaw.servings,
      cookingTime: recipeRaw.cooking_time,
      ingredients: recipeRaw.ingredients,
    };

    console.dir(recipe);

    /// 2. Render recipe

    const markup = `
    <figure class="recipe__fig">
        <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${escapeHTML(
            recipe.cookingTime
          )}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${escapeHTML(
            recipe.servings
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
          ${recipe.ingredients
            .map(
              ing => `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${escapeHTML(ing.quantity)}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${escapeHTML(ing.unit)}</span>
              ${ing.description}
            </div>
          </li>
            `
            )
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${escapeHTML(
            recipe.publisher
          )}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${escapeHTML(recipe.sourceUrl)}"
          target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    recipeContainer.innerHTML = markup;
  } catch (err) {
    console.error(err);
    recipeContainer.innerHTML = '';
    renderSpinner(recipeContainer);
  }
};

showRecipe();
