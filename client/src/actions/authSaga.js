import axios from 'axios';
import { returnErrors } from './errorActions';
import { put } from 'redux-saga/effects';

const localToken = localStorage.getItem('token');

const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localToken 
  }
};

const loadUserSuccess = (data) => ({
  type: 'USER_LOADED',
  payload: data
});

const registerSuccess = (data) => ({
  type: 'REGISTER_SUCCESS',
  payload: data
});

const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data
});

export function* loadUserSaga(){
  try{
    yield put({ type: 'USER_LOADING' });
    const data = yield axios.get('/api/auth/user', config)
    yield put(loadUserSuccess(data.data))    
  } catch(err) {
    yield put(returnErrors(err.response.data, err.response.status));
    yield put({ type: 'AUTH_ERROR' });
  }
}

export function* registerSaga(user) {
  try{
    const body = JSON.stringify(user);
    const data = yield axios.post('/api/users', body, config);
    yield put(registerSuccess(data.data));
  } catch(err) {
    yield put(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
  }
};

export function* loginSaga(user) {
  try{
    const body = JSON.stringify(user);
    const data = yield axios.post('/api/auth', body, config);
    yield put(loginSuccess(data.data));
  } catch(err) {
    yield put(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
  }
};