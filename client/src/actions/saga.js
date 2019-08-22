import { takeLatest } from 'redux-saga/effects';
import { registerSaga, loginSaga, loadUserSaga } from './authSaga';
import { getTodo, addTodo, deleteTodo, updateTodo } from './itemSaga';

export function* rootSaga() {
  yield takeLatest('GET_TODO', getTodo);
  yield takeLatest('ADD', addTodo);
  yield takeLatest('DELETE', deleteTodo);
  yield takeLatest('UPDATE', updateTodo);
  yield takeLatest('REGISTER', registerSaga);
  yield takeLatest('LOGIN', loginSaga);
  yield takeLatest('USER', loadUserSaga);
}