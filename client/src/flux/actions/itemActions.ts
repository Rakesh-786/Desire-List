import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IItem } from '../../types/interfaces';

const BASE_URL = "http://localhost:5000";
export const getItems = () => (dispatch: Function) => {
  dispatch(setItemsLoading());
  axios
    .get(`${BASE_URL}/api/items`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err => {
      const errorData = err.response ? err.response.data : 'Unknown error';
      const errorStatus = err.response ? err.response.status : 500;
      dispatch(returnErrors(errorData, errorStatus));
    });
};

export const addItem = (item: IItem) => (dispatch: Function, getState: Function) => {
  const token = tokenConfig(getState).headers['x-auth-token'];
  console.log('Token being sent:', token);
  
  axios
    .post(`${BASE_URL}/api/items`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err => {
      const errorData = err.response ? err.response.data : 'Unknown error';
      const errorStatus = err.response ? err.response.status : 500;
      console.error("Error response: ", errorData); // Log detailed error
      dispatch(returnErrors(errorData, errorStatus));
    });
};

export const deleteItem = (id: string) => (dispatch: Function, getState: Function) => {
  axios
    .delete(`${BASE_URL}/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err => {
      const errorData = err.response ? err.response.data : 'Unknown error';
      const errorStatus = err.response ? err.response.status : 500;
      dispatch(returnErrors(errorData, errorStatus));
    });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
