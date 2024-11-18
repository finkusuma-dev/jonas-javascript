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
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    // console.dir(res);
    const data = await res.json();
    // console.dir(data);
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

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
