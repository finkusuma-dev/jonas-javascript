import { API_URL } from './config';
import { getJSON } from './helpers';

export type Ingredient = {
  quantity: number;
  unit: string;
  description: string;
};
export type Recipe = {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
};

export type State = {
  recipe: Recipe | undefined;
};

export const state: State = {
  recipe: undefined,
};

export const loadRecipe = async function (id: string) {
  try {
    /// 1. Getting recipe
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.dir(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
