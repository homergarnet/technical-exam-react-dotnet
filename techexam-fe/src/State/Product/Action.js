import axios from 'axios';
import { API_BASE_URL } from 'config/apiConfig';
import {
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  GET_BY_ID_REQUEST,
  GET_BY_ID_SUCCESS,
  GET_BY_ID_FAILURE,
  GET_BY_SEARCH_REQUEST,
  GET_BY_SEARCH_SUCCESS,
  GET_BY_SEARCH_FAILURE,
  UPDATE_BY_ID_REQUEST,
  UPDATE_BY_ID_SUCCESS,
  UPDATE_BY_ID_FAILURE,
  SOFT_DELETE_BY_ID_REQUEST,
  SOFT_DELETE_BY_ID_SUCCESS,
  SOFT_DELETE_BY_ID_FAILURE,
} from './ActionType.js';

const createRequest = () => ({ type: CREATE_REQUEST });
const createSuccess = (data) => ({ type: CREATE_SUCCESS, payload: data });
const createFailure = (error) => ({ type: CREATE_FAILURE, payload: error });

const getRequest = () => ({ type: GET_REQUEST });
const getSuccess = (data) => ({ type: GET_SUCCESS, payload: data });
const getFailure = (error) => ({ type: GET_FAILURE, payload: error });

const getByIdRequest = () => ({ type: GET_BY_ID_REQUEST });
const getByIdSuccess = (data) => ({ type: GET_BY_ID_SUCCESS, payload: data });
const getByIdFailure = (error) => ({ type: GET_BY_ID_FAILURE, payload: error });

const getBySearchRequest = () => ({ type: GET_BY_SEARCH_REQUEST });
const getBySearchSuccess = (data) => ({
  type: GET_BY_SEARCH_SUCCESS,
  payload: data,
});
const getBySearchFailure = (error) => ({
  type: GET_BY_SEARCH_FAILURE,
  payload: error,
});

const updateByIdRequest = () => ({ type: UPDATE_BY_ID_REQUEST });
const updateByIdSuccess = (data) => ({
  type: UPDATE_BY_ID_SUCCESS,
  payload: data,
});
const updateByIdFailure = (error) => ({
  type: UPDATE_BY_ID_FAILURE,
  payload: error,
});

const softDeleteRequest = () => ({ type: SOFT_DELETE_BY_ID_REQUEST });
const softDeleteSuccess = (data) => ({
  type: SOFT_DELETE_BY_ID_SUCCESS,
  payload: data,
});
const softDeleteFailure = (error) => ({
  type: SOFT_DELETE_BY_ID_FAILURE,
  payload: error,
});

export const create = (createData) => async (dispatch) => {
  dispatch(createRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/product/create`,
      createData
    );
    const products = response.data;
    console.log('products ', products);
    dispatch(createSuccess(products));
  } catch (error) {
    dispatch(createFailure(error.message));
  }
};

export const getAllProduct = () => async (dispatch) => {
  console.log('dispatch request: ');
  dispatch(getRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/product/get-all`, {});
    const products = response.data;
    console.log('products ', products);
    dispatch(getSuccess(products));
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const getById = (productId) => async (dispatch) => {
  dispatch(getByIdRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/product/get-by-id/${productId}`,
      {}
    );
    const product = response.data;
    console.log('product ', product);
    dispatch(getByIdSuccess(product));
  } catch (error) {
    dispatch(getByIdFailure(error.message));
  }
};

export const getBySearch = (search) => async (dispatch) => {
  dispatch(getBySearchRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/product/get-by-search/${search}`,
      {}
    );
    const products = response.data;
    console.log('products ', products);
    dispatch(getBySearchSuccess(products));
  } catch (error) {
    dispatch(getBySearchFailure(error.message));
  }
};

export const updateById = (productId, reqData) => async (dispatch) => {
  dispatch(updateByIdRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/product/update-by-id/${productId}`,
      reqData
    );
    const products = response.data;
    console.log('products ', products);
    dispatch(updateByIdSuccess(products));
  } catch (error) {
    dispatch(updateByIdFailure(error.message));
  }
};

export const softDeleteById = (productId) => async (dispatch) => {
  dispatch(softDeleteRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/product/soft-delete/${productId}`
    );
    const products = response.data;
    console.log('products ', products);
    dispatch(softDeleteSuccess(products));
  } catch (error) {
    dispatch(softDeleteFailure(error.message));
  }
};
