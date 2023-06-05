/* eslint-disable no-useless-catch */
import axios from 'axios';

export const testApi = async () => {
  try {
    const response = axios.get(
      `https://www.garlandtools.org/db/doc/equip/ja/2/leveling-drk.json`
    );
    return response;
  } catch (e) {
    return false;
  }
};

// export const getItemInfo = async (lang, itemNo) => {
//   try {
//     if (!lang || !itemNo) {
//       throw new Error('Not Required parameters');
//     }
//     const response = axios.get(
//       `https://www.garlandtools.org/db/doc/item/${lang}/3/${itemNo}.json`
//     );
//     return response;
//   } catch (e) {
//     throw e;
//   }
// };

export const getLevelingItemInfo = async (lang, jobID, minLv, maxLv) => {
  try {
    if (!lang || !jobID || !minLv || !maxLv) {
      throw new Error('Not Required parameters');
    }
    const response = axios.get(`https://xivapi.com/search`, {
      params: {
        filters: `Recipes.Level>=${minLv},Recipes.Level<=${maxLv},Recipes.ClassJobID=${jobID},ItemKind.ID<7`,
        language: lang,
        sort_field: 'Recipes.Level',
        columns: 'Icon,Name,ID,Recipes.0.ID',
        snake_case: '1',
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const getItemInfo = async (lang, itemNo) => {
  try {
    if (!lang || !itemNo) {
      throw new Error('Not Required parameters');
    }
    const response = axios.get(`https://xivapi.com/item/${itemNo}`, {
      params: {
        columns:
          'ClassJobUse,Name,Recipes.0.ID,IconHD,ID,ItemUICategory,LevelEquip,LevelItem',
        language: lang,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const getRecipeFromItemInfo = async (lang, itemNo) => {
  try {
    if (!lang || !itemNo) {
      throw new Error('Not Required parameters');
    }
    const response = axios.get(`https://xivapi.com/item/${itemNo}`, {
      params: {
        columns: 'Recipes.0.ID',
        language: lang,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const getRecipeInfo = async (lang, recipeNo) => {
  try {
    if (!lang || !recipeNo) {
      throw new Error('Not Required parameters');
    }
    const response = axios.get(`https://xivapi.com/recipe/${recipeNo}`, {
      params: {
        columns:
          'Name,' +
          'AmountResult,' +
          'AmountIngredient0,' +
          'AmountIngredient1,' +
          'AmountIngredient2,' +
          'AmountIngredient3,' +
          'AmountIngredient4,' +
          'AmountIngredient5,' +
          'AmountIngredient6,' +
          'AmountIngredient7,' +
          'AmountIngredient8,' +
          'AmountIngredient9,' +
          'ItemIngredient0.ID,' +
          'ItemIngredient0.Name,' +
          'ItemIngredient0.Icon,' +
          'ItemIngredient1.ID,' +
          'ItemIngredient1.Name,' +
          'ItemIngredient1.Icon,' +
          'ItemIngredient2.ID,' +
          'ItemIngredient2.Name,' +
          'ItemIngredient2.Icon,' +
          'ItemIngredient3.ID,' +
          'ItemIngredient3.Name,' +
          'ItemIngredient3.Icon,' +
          'ItemIngredient4.ID,' +
          'ItemIngredient4.Name,' +
          'ItemIngredient4.Icon,' +
          'ItemIngredient5.ID,' +
          'ItemIngredient5.Name,' +
          'ItemIngredient5.Icon,' +
          'ItemIngredient6.ID,' +
          'ItemIngredient6.Name,' +
          'ItemIngredient6.Icon,' +
          'ItemIngredient7.ID,' +
          'ItemIngredient7.Name,' +
          'ItemIngredient7.Icon,' +
          'ItemIngredient8.ID,' +
          'ItemIngredient8.Name,' +
          'ItemIngredient8.Icon,' +
          'ItemIngredient9.ID,' +
          'ItemIngredient9.Name,' +
          'ItemIngredient9.Icon,' +
          'ItemIngredientRecipe0.0.ID,' +
          'ItemIngredientRecipe1.0.ID,' +
          'ItemIngredientRecipe2.0.ID,' +
          'ItemIngredientRecipe3.0.ID,' +
          'ItemIngredientRecipe4.0.ID,' +
          'ItemIngredientRecipe5.0.ID,' +
          'ItemIngredientRecipe6.0.ID,' +
          'ItemIngredientRecipe7.0.ID,' +
          'ItemIngredientRecipe8.0.ID,' +
          'ItemIngredientRecipe9.0.ID',
        snake_case: '1',
        language: lang,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};
