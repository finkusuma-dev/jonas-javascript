import * as model from './model';
import recipeView from './views/recipeView';

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

const controlRecipe = async function (id: string) {
  recipeView.renderSpinner();
  try {
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe!);
  } catch (err) {
    recipeView.renderError();
  }
};

['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev, function () {
    const hashId = this.window.location.hash.slice(1);
    // console.log(hashId);
    if (!hashId) return;
    controlRecipe(hashId);
  });
});
