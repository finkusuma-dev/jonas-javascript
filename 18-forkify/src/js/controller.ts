import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

const recipeContainer: HTMLElement = document.querySelector('.recipe')!;

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  recipeView.renderSpinner();
  try {
    const hashId = this.window.location.hash.slice(1);

    // console.log(hashId);
    if (!hashId) {
      recipeView.renderMessage();
      return;
    }
    await model.loadRecipe(hashId);
    recipeView.render(model.state.recipe!);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  recipeView.renderSpinner();
  try {
    const query = searchView.getQuery();
    await model.loadSearchResult(query);
    console.dir(model.state.search.results);
    recipeView.clear();
  } catch (err) {
    recipeView.renderError(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
