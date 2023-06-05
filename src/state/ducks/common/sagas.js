import { put, takeEvery } from 'redux-saga/effects';
import i18n from '../../../common/localize/i18n';
import garlandsActions from '../garlands/actions';
import { default as actions } from './actions';

function* doChangeLanguage({ payload }) {
  try {
    i18n.changeLanguage(payload.lng);
    yield put(actions.changeLanguageSuccess(payload.lng));
    yield put(garlandsActions.clearCraftingList());
    yield put(garlandsActions.clearCraftRecipeList());
    yield put(garlandsActions.clearResultList());
  } catch (e) {
    console.error('error of doChangeLanguage');
    console.log(e);
    yield put(actions.closeLoading());
  }
}

function* commonRootSaga() {
  yield takeEvery(actions.changeLanguage, doChangeLanguage);
}

export default commonRootSaga;
