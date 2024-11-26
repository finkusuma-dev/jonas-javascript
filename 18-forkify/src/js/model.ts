import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helpers';

export type Pagination = {
  page: number;
  isLastPage: boolean;
};

export type Ingredient = {
  quantity: number;
  unit: string;
  description: string;
};
export type Recipe = {
  id: string;
  title: string;
  publisher: string;
  image: string;
  sourceUrl?: string;
  servings?: number;
  cookingTime?: number;
  ingredients?: Ingredient[];
};

export type Search = {
  query?: string;
  results?: Recipe[];
  page: number;
};

export type State = {
  recipe?: Recipe;
  search: Search;
};

export const state: State = {
  recipe: undefined,
  search: {
    page: 1,
  },
};

export const loadRecipe = async function (id: string) {
  try {
    /// 1. Getting recipe
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = assignRecipe(recipe);

    // console.dir(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResult = async function (query: string) {
  try {
    state.search.query = query;
    state.search.page = 1;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe =>
      assignRecipe(recipe)
    );
  } catch (err) {
    throw err;
  }
};

export const getPaginationSearchResults = function (
  recipes?: Recipe[],
  page: number = 1
): Recipe[] {
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE - 1;
  console.dir({ page, start, end });
  return recipes?.slice(start, end + 1) ?? [];
};

const assignRecipe = function (jsonData: any): Recipe {
  return {
    id: jsonData.id,
    title: jsonData.title,
    publisher: jsonData.publisher,
    image: jsonData.image_url,
    sourceUrl: jsonData.source_url,
    servings: jsonData.servings,
    cookingTime: jsonData.cooking_time,
    ingredients: jsonData.ingredients,
  };
};
