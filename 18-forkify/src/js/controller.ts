import { isLastPage } from './helpers';
import type { PageFn, PaginateData } from './lib/types';
import * as model from './model';
import bookmarksView from './views/bookmarksView';
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

const controlRecipe = async function () {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) {
      recipeView.renderMessage();
      return;
    }
    recipeView.renderSpinner();

    /// Update the active search result item
    /* 1. */ searchResultsView.update(model.getPaginateRecipes());
    // 2. searchResultsView.renderActiveResult();
    // 3. searchResultsView.render(
    //   model.getPaginateRecipes()
    // );

    await model.loadRecipe(hashId);
    recipeView.render(model.state.recipe!);

    /// handle Change Servings
    recipeView.addHandlerChangeServings(controlRecipeServings);
    /// handle bookmark
    recipeView.addHandlerBookmark(controlBookmarks);
    /// update active bookmarks in bookmarksView
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlRecipeServings = function (newServings: number) {
  // console.log('controlRecipeServings amount', newServings);
  model.updateRecipeServings(newServings);

  recipeView.update(model.state.recipe!);
  // recipeView.renderServings(model.state.recipe!);
};

const controlSearchResults = async function () {
  searchResultsView.renderSpinner();
  try {
    /// Load query
    const query = searchView.getQuery();
    await model.loadSearchResult(query);

    /// Assign controlPagination function to model.state.search. Bind the required variables.
    model.state.search.controlPaginationFn = controlPagination.bind({
      renderItemsCallback: function (page) {
        searchResultsView.render(model.getPaginateRecipes(page));
      },
      dataState: model.state.search,
    });

    /// Call the control pagination function to render results & pagination
    model.state.search.controlPaginationFn!(1);

    /// Add pagination click handler
    paginationView.addHandlerClick(
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
    renderItemsCallback: PageFn;
    dataState: PaginateData<T>;
  },
  page: number = 1
) {
  /// Update page (state)
  this.dataState.page = page;

  /// Render items on page
  this.renderItemsCallback(page);

  /// Render pagination
  paginationView.render(this.dataState);
};

export type ControlBookmarkFn = typeof controlBookmarks;
/**
 * @param init Optional param.
 * - true: Init the bookmark. Load from localStorage.
 * - false (default): Toggle the bookmark of the current recipe.
 */
const controlBookmarks = function (init: boolean = false) {
  if (init) {
    console.log('init bookmarks');
    model.loadBookmarks();
  } else {
    console.log('toggle bookmarks');
    model.toggleBookmark();
    recipeView.update(model.state.recipe);
  }

  if (!model.state.bookmarks.length) {
    return bookmarksView.renderMessage();
  }

  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  bookmarksView.addHandlerRender(controlBookmarks);
};

init();
