import * as model from './model';
import recipeView from './views/recipeView';
import searchResultsView from './views/searchResultsView';
import searchView from './views/searchView';

/// typescript doesn't recognize module, so install @types/node package
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  recipeView.renderSpinner();
  try {
    const hashId = window.location.hash.slice(1);

    // console.dir(hashId);
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
  searchResultsView.renderSpinner();
  try {
    const query = searchView.getQuery();
    await model.loadSearchResult(query);
    // console.dir(model.state.search.results);

    searchResultsView.render(model.state.search.results);
  } catch (err) {
    searchResultsView.renderError(err as string);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
