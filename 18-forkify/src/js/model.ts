import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helpers';
import type { PaginateDataControl } from './lib/types';

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
  bookmarked: boolean;
  key?: string;
};

export type Search = PaginateDataControl<Recipe> & { query?: string };

export type State = {
  recipe?: Recipe;
  bookmarks: Recipe[];
  search: Search;
};

export const state: State = {
  bookmarks: [],
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

    const data = await getJSON(
      `${API_URL}?search=${query}&key=${process.env.API_KEY}`
    );

    state.search.items = data.data.recipes.map(recipe =>
      assignRecipe(recipe)
    );
    // console.log('items length', state.search.items?.length ?? 0);
    // console.log('items', state.search.items);
  } catch (err) {
    throw err;
  }
};

export const getPaginateRecipes = function (
  page: number = state.search.page
): Recipe[] {
  return getPaginateItems(state.search.items, page);
};

export const addBookmark = function (recipe: Recipe) {
  state.bookmarks.push(recipe);
  saveBookmarks();
};

export const toggleBookmark = function () {
  if (!state.recipe) return;

  const bookmarked = state.bookmarks.find(
    bookmark => bookmark.id === state.recipe!.id
  );

  if (bookmarked) {
    console.log('Remove recipe from bookmarks');

    const idx = state.bookmarks.findIndex(
      bookmark => bookmark.id == state.recipe?.id
    );

    if (idx < 0) return;

    state.bookmarks.splice(idx, 1);
  } else {
    console.log('Add recipe to bookmarks');
    state.bookmarks.push(state.recipe!);
  }

  if (state.recipe) {
    state.recipe.bookmarked = !state.recipe.bookmarked;
  }

  saveBookmarks();
};

export const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const loadBookmarks = function () {
  const strBookmarks = localStorage.getItem('bookmarks');
  if (!strBookmarks) return;
  state.bookmarks = JSON.parse(strBookmarks);
};

export const getPaginateItems = function <T>(
  allItems?: T[],
  page: number = state.search.page
): T[] {
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE - 1;
  // console.dir({ page, start, end });
  return allItems?.slice(start, end + 1) ?? [];
};

export const uploadRecipe = async function (
  newRecipe: [string, FormDataEntryValue][]
) {
  try {
    console.log({ newRecipe });
    const uploadRecipe = prepareUploadRecipe(newRecipe);
    console.log({ uploadRecipe });

    const res = await sendJSON(
      `${API_URL}?key=${process.env.API_KEY}`,
      uploadRecipe
    );
    console.log({ res });
    return res;
  } catch (error) {
    throw error;
  }
};

const prepareUploadRecipe = function (newRecipe: any) {
  const ingredients: Ingredient[] = newRecipe
    .filter(
      item => item[0].startsWith('ingredient') && item[1] !== ''
    )
    .map((item: [string, string]) => {
      const values = item[1].replaceAll(' ', '').split(',');
      if (values.length < 3) {
        throw new Error(
          "Some ingredients don't have the correct format!"
        );
      }
      const [quantity, unit, description] = values;
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description,
      };
    });

  const recipeObj = {
    ...Object.fromEntries(
      newRecipe.filter(item => !item[0].includes('ingredient'))
    ),
    ingredients,
  } as Omit<Recipe, 'id'>;

  return {
    title: recipeObj.title,
    publisher: recipeObj.publisher,
    image_url: recipeObj.image,
    servings: recipeObj.servings ? +recipeObj.servings : null,
    source_url: recipeObj.sourceUrl,
    cooking_time: recipeObj.cookingTime
      ? +recipeObj.cookingTime
      : null,
    ingredients,
  };
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
    bookmarked: state.bookmarks.some(
      bookmark => bookmark.id === jsonData.id
    ),
    ...(jsonData.key && { key: jsonData.key }),
  };
};

const init = function () {
  loadBookmarks();
};

init();
