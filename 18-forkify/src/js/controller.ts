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

    /// Render results
    model.state.search.controlPaginationFn =
      createControlPagination<model.Recipe>(
        function (page) {
          const pageResults = model.getPaginationData(
            model.state.search.results,
            page
          );
          searchResultsView.render(pageResults);
        },
        {
          page: model.state.search.page,
          data: model.state.search.results,
        }
      );

    model.state.search.controlPaginationFn!(1);

    paginationView.addHandlerPagination(
      model.state.search.controlPaginationFn
    );
  } catch (err) {
    searchResultsView.renderError(err as string);
  }
};

/**
 * @description Using currying to return controlPagination function.
 * @param renderDataFn Function to render data based on page number.
 * @param stateData A state variable to be accessed by the returned function.
 * @returns `controlPagination` function
 */
const createControlPagination = function <T>(
  renderDataFn: (page: number) => void,
  stateData: {
    page: number;
    data?: T[];
  }
) {
  return function (page: number = 1) {
    stateData.page = page;

    /// Render results
    renderDataFn(page);

    /// Render pagination
    paginationView.render({
      page: page,
      isLastPage: isLastPage(page, stateData.data?.length ?? 0),
    });

    /// add handler pagination
  };
};

/**
 * @description Navigate to a page, render results, and render pagination.
 * @param Direction:
 * - Prev, next: Go to previous or next page.
 * - Undefined: Do not change the page data in state.
 */
// const controlPagination = function (page: number = 1) {
//   const { search } = model.state;

//   /// Render results
//   const pageResults = model.getPaginationData(search.results, page);
//   searchResultsView.render(pageResults);

//   /// Render pagination
//   paginationView.render({
//     page: search.page,
//     isLastPage: isLastPage(search.page, search.results?.length ?? 0),
//   });

//   /// add handler pagination
// };

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
