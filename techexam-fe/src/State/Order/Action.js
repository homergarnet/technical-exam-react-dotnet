import axios from 'axios';
import { API_BASE_URL } from 'config/apiConfig';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_FAILURE,
  REMOVE_FROM_ORDER_REQUEST,
  REMOVE_FROM_ORDER_SUCCESS,
  REMOVE_FROM_ORDER_FAILURE,
  UPDATE_IS_PAID_REQUEST,
  UPDATE_IS_PAID_SUCCESS,
  UPDATE_IS_PAID_FAILURE,
} from './ActionType.js';

const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
const createOrderSuccess = (data) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: data,
});
const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

const getAllOrderRequest = () => ({ type: GET_ALL_ORDER_REQUEST });
const getAllOrderSuccess = (data) => ({
  type: GET_ALL_ORDER_SUCCESS,
  payload: data,
});
const getAllOrderFailure = (error) => ({
  type: GET_ALL_ORDER_FAILURE,
  payload: error,
});

const removeFromOrderRequest = () => ({ type: REMOVE_FROM_ORDER_REQUEST });
const removeFromOrderSuccess = (data) => ({
  type: REMOVE_FROM_ORDER_SUCCESS,
  payload: data,
});
const removeFromOrderFailure = (error) => ({
  type: REMOVE_FROM_ORDER_FAILURE,
  payload: error,
});

const updateIsPaidRequest = () => ({ type: UPDATE_IS_PAID_REQUEST });
const updateIsPaidSuccess = (data) => ({
  type: UPDATE_IS_PAID_SUCCESS,
  payload: data,
});
const updateIsPaidFailure = (error) => ({
  type: UPDATE_IS_PAID_FAILURE,
  payload: error,
});

export const createOrder = (createData) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/orders/create`,
      createData
    );
    const order = response.data;
    console.log('order ', order);
    dispatch(createOrderSuccess(order));
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};

export const getAllOrder = () => async (dispatch) => {
  console.log('dispatch request: ');
  dispatch(getAllOrderRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/orders/get-all`, {});
    const orders = response.data;
    console.log('orders ', orders);
    dispatch(getAllOrderSuccess(orders));
  } catch (error) {
    dispatch(getAllOrderFailure(error.message));
  }
};

export const removeFromOrder = (orderId) => async (dispatch) => {
  dispatch(removeFromOrderRequest());
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/orders/remove-from-order/${orderId}`
    );
    const order = response.data;
    console.log('order ', order);
    dispatch(removeFromOrderSuccess(order));
  } catch (error) {
    dispatch(removeFromOrderFailure(error.message));
  }
};

export const updateIsPaidById = () => async (dispatch) => {
  dispatch(updateIsPaidRequest());
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/orders/update-is-paid-by-id`
    );
    const order = response.data;
    console.log('order ', order);
    dispatch(updateIsPaidSuccess(order));
  } catch (error) {
    dispatch(removeFromOrderFailure(error.message));
  }
};
