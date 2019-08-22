import { put } from 'redux-saga/effects';
import axios from 'axios';
import { returnErrors } from './errorActions';

const localToken = localStorage.getItem('token');

const token = { 
  headers: { 
    'x-auth-token': localToken 
  } 
};

const GETITEMS = (data) => ({
  type: 'GET_ITEMS',
  payload: data.data
}); 

const ADDITEM = (data) => ({
  type: 'ADD_ITEM',
  payload: data.data
});

const DELETE_ITEM = (id) => ({
  type: 'DELETE_ITEM',
  payload: id
})

const UPDATE_ITEM = (item) => ({
  type: 'UPDATE_ITEM',
  payload: item
});


export const setItemsLoading = () => ({
  type: 'ITEMS_LOADING',
});

export function* getTodo() {
  try{
    yield put(setItemsLoading());
    const data = yield axios.get('/api/items/', token);
    yield put(GETITEMS(data));
  }catch(err) {
    yield put(returnErrors(err.response.data, err.response.status))
  }

};

export function* addTodo(item) {
  try{
    const data = yield axios.post('/api/items/', item, token);
    yield put(ADDITEM(data));
  }catch(err) {
    yield put(returnErrors(err.response.data, err.response.status))
  }

};

export function* updateTodo(item) {
  try{
    const data = yield axios.put(`/api/items/${item.id}`, item, token);
    yield put(UPDATE_ITEM(data));
  }catch(err) {
    yield put(returnErrors(err.response.data, err.response.status))
  }

};

export function* deleteTodo(item) {
  try{
    yield axios.delete(`/api/items/${item.id}`, token)
    yield put(DELETE_ITEM(item.id));
  }catch(err) {
    yield put(returnErrors(err.response.data, err.response.status))
  }  
};