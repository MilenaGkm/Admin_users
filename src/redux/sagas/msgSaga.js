import { call, put, takeEvery } from 'redux-saga/effects'
import { getMsgsApi, postMsgsApi, deleteMsgApi } from '../../services/apiServices';

function* fetchMsgs(action) {
   try {
      const msgs = yield call(getMsgsApi);
      yield put({type: 'GET_MSGS_SUCCESS', msgs: msgs});
   } catch (e) {
      yield put({type: 'GET_MSGS_FAILED', message: e.message});
   }
}

function* addMsg(action) {
   try {
      yield call(postMsgsApi, action.payload);
      yield fetchMsgs();
   } catch (e) {
      yield put({type: 'ADD_MSG_FAILED', message: e.message});
   }
}

function* deleteMsg(action) {
   try {
      yield call(deleteMsgApi, action.payload);
      yield fetchMsgs();
   } catch (e) {
      yield put({type: 'DELETE_MSG_FAILED', message: e.message});
   }
}

function* msgSaga() {
   yield takeEvery('GET_MSGS_REQUESTED', fetchMsgs);
   yield takeEvery('ADD_MSG_REQUESTED', addMsg);
   yield takeEvery('DELETE_MSG_REQUESTED', deleteMsg);
}

export default msgSaga;