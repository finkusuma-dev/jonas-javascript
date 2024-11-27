import { isLastPage } from './helpers';
import * as types from './lib/types';
import * as model from './model';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import searchResultsView from './views/searchResultsView';
import searchView from './views/searchView';

/// Typescript doesn't recognize module, so I added lib/module.d.ts.
/// After installing `@types/node` package, I added HMR types to NodeModule interface,
/// which is the interface for module.
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
    /// Load query
    const query = searchView.getQuery();
    await model.loadSearchResult(query);

    /// Assign controlPagination function to model.state.search. Bind the required variables.
    model.state.search.controlPaginationFn = controlPagination.bind({
      renderItemsCallback: function (page) {
        searchResultsView.render(
          model.getPaginateItems(model.state.search.items, page)
        );
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
    renderItemsCallback: types.PageFn;
    dataState: types.PaginateData<T>;
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

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
