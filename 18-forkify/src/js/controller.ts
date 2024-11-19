import * as model from './model';
import recipeView from './views/recipeView';

const recipeContainer: HTMLElement = document.querySelector('.recipe')!;

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function (id: string) {
  recipeView.renderSpinner();
  try {
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe!);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
