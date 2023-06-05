import { default as garlandsReducer } from './garlands';
import { default as commonReducer } from './common';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  garlandsReducer,
  commonReducer,
});

export default rootReducer;
