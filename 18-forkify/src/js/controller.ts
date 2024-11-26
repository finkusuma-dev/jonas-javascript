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
    controlPageResults();
  } catch (err) {
    searchResultsView.renderError(err as string);
  }
};

/**
 * @description Navigate to a page, render results, and render pagination.
 * @param Direction:
 * - Prev, next: Go to previous or next page.
 * - Undefined: Do not change the page data in state.
 */
const controlPageResults = function (
  direction?: types.PageDirection
) {
  const { search } = model.state;

  /// Page navigation
  if (direction === 'prev' && search.page > 1) {
    model.state.search.page -= 1;
  } else if (
    direction === 'next' &&
    !isLastPage(search.page, search.results?.length ?? 0)
  ) {
    model.state.search.page += 1;
  }

  /// Render results
  const pageResults = model.getPaginationSearchResults(
    search.results,
    search.page
  );
  searchResultsView.render(pageResults);

  /// Render pagination
  paginationView.render({
    page: search.page,
    isLastPage: isLastPage(search.page, search.results?.length ?? 0),
  });

  /// add handler pagination
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPageResults);
};

init();
