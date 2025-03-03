import {call, put, takeEvery} from 'redux-saga/effects';
import {setData, setError, setLoading} from './slice';
import {fetchHomeContent} from './api';
import {GET_HOME_CONTENT} from './constants';

function* fetchApiHomeContentSaga(): any {
  try {
    yield put(setLoading());
    const data = yield call(fetchHomeContent);
    yield put(setData(data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* homeSaga(): any {
  yield takeEvery(GET_HOME_CONTENT, fetchApiHomeContentSaga);
}

export default homeSaga;
