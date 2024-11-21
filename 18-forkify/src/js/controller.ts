import * as model from './model';
import recipeView from './views/recipeView';

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

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
