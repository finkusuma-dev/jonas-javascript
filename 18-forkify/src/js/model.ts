import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helpers';
import { PaginateDataControl } from './lib/types';

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

export type Search = PaginateDataControl<Recipe> & { query?: string };

export type State = {
  recipe?: Recipe;
  search: Search;
};

export const state: State = {
  recipe: undefined,
  search: {
    query: undefined,
    items: undefined,
    page: 1,
    controlPaginationFn: undefined,
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

export const updateRecipeServings = function (newServings: number) {
  if (!state.recipe) return;

  const prevServings = state.recipe.servings ?? 1;
  state.recipe.servings = newServings;

  state.recipe.ingredients?.forEach(ing => {
    const prevIngQty = ing.quantity;
    ing.quantity = (ing.quantity * newServings) / prevServings;
  });
};

export const loadSearchResult = async function (query: string) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.items = data.data.recipes.map(recipe =>
      assignRecipe(recipe)
    );
    console.log('data length', state.search.items?.length ?? 0);
  } catch (err) {
    throw err;
  }
};

export const getPaginateItems = function <T>(
  allItems?: T[],
  page: number = 1
): T[] {
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE - 1;
  console.dir({ page, start, end });
  return allItems?.slice(start, end + 1) ?? [];
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
