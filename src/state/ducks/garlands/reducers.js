/* REDUCER(S)
It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.
*/

import { handleActions } from 'redux-actions';
import garlandActions from './actions';

const initialData = {
  levelingData: [],
  craftRecipeList: [],
  craftingList: [],
  resultList: {
    craftingList: {},
    level1: {},
    level2: {},
    level3: {},
    level4: {},
    crystal: {},
  },
};

const pushCrafingList = (list, value) => {
  const addedList = list;
  if (addedList.length > 0) {
    if (!addedList.some((data) => data.id === value.id)) addedList.push(value);
  } else {
    addedList.push(value);
  }
  return addedList;
};

const changeCrafingEA = (list, payload) => {
  const addedList = list;
  addedList[payload.index].ea = payload.value;
  return addedList;
};

const deleteCraftingList = (list, index) => {
  const addedList = list;
  addedList.splice(index, 1);
  return addedList;
};

const reducer = handleActions(
  {
    [garlandActions.getLevelingActionSuccess]: (state, action) => ({
      ...state,
      levelingData: action.payload.data,
    }),
    [garlandActions.clearCraftingList]: (state) => ({
      ...state,
      craftingList: [],
    }),
    [garlandActions.clearCraftRecipeList]: (state) => ({
      ...state,
      craftRecipeList: [],
    }),
    [garlandActions.clearResultList]: (state) => ({
      ...state,
      resultList: {
        craftingList: {},
        level1: {},
        level2: {},
        level3: {},
        level4: {},
        crystal: {},
      },
    }),
    [garlandActions.getCraftRecipeListSuccess]: (state, action) => ({
      ...state,
      craftRecipeList: action.payload.data,
    }),

    [garlandActions.addCraftingList]: (state, action) => ({
      ...state,
      craftingList: pushCrafingList(state.craftingList, {
        ...action.payload.itemData,
        ea: 1,
      }),
    }),

    [garlandActions.setCraftingEA]: (state, action) => ({
      ...state,
      craftingList: changeCrafingEA(state.craftingList, action.payload),
    }),

    [garlandActions.deleteCraftingList]: (state, action) => ({
      ...state,
      craftingList: deleteCraftingList(
        state.craftingList,
        action.payload.index
      ),
    }),
    [garlandActions.calculateCraftingListSuccess]: (state, action) => ({
      ...state,
      resultList: action.payload.data,
    }),
  },
  initialData
);

export default reducer;
