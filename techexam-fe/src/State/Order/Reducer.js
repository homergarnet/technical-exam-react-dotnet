const {
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
} = require('./ActionType');
const initialState = {
  orderList: [],
  order: null,
  loading: false,
  error: null,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ALL_ORDER_REQUEST:
    case REMOVE_FROM_ORDER_REQUEST:
    case UPDATE_IS_PAID_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orderList: action.payload,
      };
    case CREATE_ORDER_SUCCESS:
    case REMOVE_FROM_ORDER_SUCCESS:
    case UPDATE_IS_PAID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
    case GET_ALL_ORDER_FAILURE:
    case REMOVE_FROM_ORDER_FAILURE:
    case UPDATE_IS_PAID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
