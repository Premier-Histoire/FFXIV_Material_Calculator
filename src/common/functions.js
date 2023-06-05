export const calculateCraftingListInRecipe = (recipeData, crystalData) => {
  const resultData = {
    craftData: {},
    materialData: {},
    crystal: crystalData,
    anotherRecipeData: [],
  };
  if (recipeData.length === 0) return resultData;
  // material level 1
  for (const recipe of recipeData) {
    resultData.craftData[recipe.name] = {};
    for (let num = 0; num < 9; num++) {
      if (recipe[`amount_ingredient${num}`] !== 0) {
        const amount = recipe[`amount_ingredient${num}`] * recipe.ea;
        const itemdata = {
          amount: Math.ceil(amount / recipe[`amount_result`]),
          info: recipe[`item_ingredient${num}`],
          checked: false,
          lowLevelMaterial: [],
        };
        if (num >= 8) {
          const crystalData = {
            amount: Math.ceil(
              (recipe[`amount_ingredient${num}`] * recipe.ea) /
                recipe[`amount_result`]
            ),
            info: recipe[`item_ingredient${num}`],
            checked: false,
            lowLevelMaterial: [],
          };
          if (resultData.crystal[crystalData.info.name]) {
            resultData.crystal[crystalData.info.name].amount +=
              crystalData.amount;
          } else resultData.crystal[crystalData.info.name] = crystalData;
        } else {
          if (recipe[`item_ingredient_recipe${num}`][0]['id'])
            resultData.anotherRecipeData.push({
              recipe: recipe[`item_ingredient_recipe${num}`][0]['id'],
              ea: itemdata.amount,
            });

          if (resultData.craftData[recipe.name][itemdata.info.name]) {
            const tempItemData = { ...itemdata };

            resultData.craftData[recipe.name][itemdata.info.name].push(
              tempItemData
            );
          } else {
            const tempItemData = { ...itemdata };

            resultData.craftData[recipe.name] = {
              ...resultData.craftData[recipe.name],
              [itemdata.info.name]: [tempItemData],
            };
          }
          if (resultData.materialData[itemdata.info.name]) {
            const amount =
              resultData.materialData[itemdata.info.name].amount +
              itemdata.amount;
            resultData.materialData[itemdata.info.name] = {
              ...resultData.materialData[itemdata.info.name],
              amount: amount,
            };
          } else resultData.materialData[itemdata.info.name] = itemdata;
        }
      }
    }
  }

  // eslint-disable-next-line no-undef
  const newAnotherData = resultData.anotherRecipeData;
  var newAnotherResult = [];
  newAnotherData.forEach(function (a) {
    if (!this[a.recipe]) {
      this[a.recipe] = { recipe: a.recipe, ea: 0 };
      newAnotherResult.push(this[a.recipe]);
    }
    this[a.recipe].ea += a.ea;
  }, Object.create(null));
  resultData.anotherRecipeData = newAnotherResult;

  return resultData;
};

export function getMaterialData(craftingList, MaterialData) {
  // set low level in material
  for (const itemname in craftingList) {
    if (MaterialData.craftData[itemname])
      craftingList[itemname].lowLevelMaterial = [
        MaterialData.craftData[itemname],
      ];
  }
}

export function calculatingMaterialLevel(levelLowData, levelHighData) {
  // set low level in material
  for (const itemname in levelHighData.craftData) {
    if (levelLowData.materialData[itemname])
      levelLowData.materialData[itemname].lowLevelMaterial.push(
        levelHighData.craftData[itemname]
      );
  }
}

export function calculatingMaterialLevel2(levelLowData, levelHighData) {
  // move duplicating recipe in recipe
  for (const itemname in levelLowData.craftData) {
    if (levelHighData.craftData[itemname]) {
      for (const materialname in levelLowData.craftData[itemname]) {
        levelHighData.craftData[itemname][materialname][0].amount +=
          levelLowData.craftData[itemname][materialname][0].amount;
      }
      delete levelLowData.craftData[itemname];
    }
  }
  // move duplicating recipe in recipe
  for (const itemname in levelLowData.materialData) {
    if (levelHighData.materialData[itemname]) {
      const amount =
        levelLowData.materialData[itemname].amount +
        levelHighData.materialData[itemname].amount;

      levelHighData.materialData[itemname].amount = amount;
      delete levelLowData.materialData[itemname];
    }
  }
}
