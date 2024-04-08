const {
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
} = require('./ActionType');
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST:
    case GET_BY_ID_REQUEST:
    case CREATE_REQUEST:
    case GET_BY_SEARCH_REQUEST:
    case UPDATE_BY_ID_REQUEST:
    case SOFT_DELETE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_SUCCESS:
    case UPDATE_BY_ID_SUCCESS:
    case SOFT_DELETE_BY_ID_SUCCESS:
    case GET_SUCCESS:
    case GET_BY_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case GET_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case GET_FAILURE:
    case GET_BY_ID_FAILURE:
    case CREATE_FAILURE:
    case GET_BY_SEARCH_FAILURE:
    case SOFT_DELETE_BY_ID_FAILURE:
    case UPDATE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
