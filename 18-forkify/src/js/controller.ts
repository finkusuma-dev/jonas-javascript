import { isLastPage } from './helpers';
import type {
  ControlPaginationFn,
  PaginationData,
} from './lib/types';
import * as model from './model';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import searchResultsView from './views/searchResultsView';
import searchView from './views/searchView';

/// Typescript doesn't recognize module, so I added lib/module.d.ts.
/// After installing `@types/node` package, I added HMR types to NodeModule interface,
/// which is the interface for module.
// if (module.hot) {
//   module.hot.accept();
// }

const renderRecipe = async function () {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) {
      recipeView.renderMessage();
      return;
    }
    recipeView.renderSpinner();

    /// Update the active search result item
    /* 1. */ searchResultsView.update(
      model.getPaginatedRecipeItems()
    );
    // 2. searchResultsView.renderActiveResult();
    // 3. searchResultsView.render(
    //   model.getPaginateRecipes()
    // );

    await model.loadRecipe(hashId);
    recipeView.render(model.state.recipe!);

    /// update active bookmarks in bookmarksView
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

export type changeRecipeServingsFn = typeof changeServings;
/**
 * @description Control handler for updating recipe servings
 */
const changeServings = function (newServings: number) {
  // console.log('controlRecipeServings amount', newServings);
  model.updateRecipeServings(newServings);

  recipeView.update(model.state.recipe!);
  // recipeView.renderServings(model.state.recipe!);
};

const search = async function () {
  searchResultsView.renderSpinner();
  try {
    /// Load query
    const query = searchView.getQuery();
    await model.loadSearchResult(query);

    /// Assign controlPagination function to model.state.search. Bind the required variables.
    model.state.search.controlPaginationFn = controlPagination.bind({
      renderPaginatedItemsCallback: function (page) {
        searchResultsView.render(model.getPaginatedRecipeItems(page));
      },
      paginationData: model.state.search,
    });

    /// Call the control pagination function to render results & pagination
    model.state.search.controlPaginationFn!(1);

    /// Add pagination click handler
    paginationView.bindClickHandler(
      model.state.search.controlPaginationFn
    );
  } catch (err) {
    searchResultsView.renderError(err as string);
  }
};

// /**
//  * @description Using currying to return controlPagination function.
//  * @param renderItemsCallback Function to render data based on page number.
//  * @param dataState A state variable to be accessed by the returned function.
//  * @returns `controlPagination` function
//  */
// const createControlPagination = function <T>(
//   renderItemsCallback: types.PageFn,
//   dataState: types.PaginateData<T>
// ): types.PageFn {
//   /// return paginationControl function
//   return controlPagination.bind({
//     renderItemsCallback,
//     dataState,
//   });
// };

/**
 * @description Update the page state, render items and pagination on a page.
 */
const controlPagination = function <T>(
  this: {
    renderPaginatedItemsCallback: ControlPaginationFn;
    paginationData: PaginationData<T>;
  },
  page: number = 1
) {
  /// Update page (state)
  this.paginationData.page = page;

  /// Render items on page
  this.renderPaginatedItemsCallback(page);

  /// Render pagination
  paginationView.render(this.paginationData);
};

// export type ControlBookmarkFn = typeof bookmark;
/**
 * @param init Optional param.
 * - true: Init the bookmark. Load from localStorage.
 * - false (default): Toggle the bookmark of the current recipe.
 */
const renderBookmark = function () {
  /// Render message if there are no bookmarks
  if (!model.state.bookmarks.length) {
    return bookmarksView.renderMessage();
  }

  bookmarksView.render(model.state.bookmarks);
};

const toggleBookmark = function () {
  console.log('toggle bookmarks');
  model.toggleBookmark();
  recipeView.update(model.state.recipe);

  renderBookmark();
};

const submitRecipe = async function (e: SubmitEvent) {
  // console.log('Submit Recipe', e.target, e.currentTarget);

  const recipeEntries = [
    ...new FormData(e.target as HTMLFormElement),
  ];

  try {
    addRecipeView.clearError();
    addRecipeView.renderBusy();
    try {
      const res = await model.uploadRecipe(recipeEntries);
      const recipe: model.Recipe = res.data.recipe;

      // Change URL without reloading the page
      history.pushState(null, '', `#${recipe.id}`);

      // Update recipe state
      model.state.recipe = recipe;
      recipeView.render(model.state.recipe);

      // Add current recipe to bookmarks
      toggleBookmark();
    } finally {
      addRecipeView.renderBusy(false);
    }
    addRecipeView.hide();
  } catch (error) {
    console.error(error);
    addRecipeView.renderError((error as any).message);
  }
};

const init = function () {
  recipeView.bindRender(renderRecipe);
  recipeView.bindChangeServings(changeServings);
  recipeView.bindToggleBookmark(toggleBookmark);
  searchView.bindSearch(search);
  bookmarksView.bindRender(renderBookmark);
  addRecipeView.bindSubmit(submitRecipe);
};

init();
