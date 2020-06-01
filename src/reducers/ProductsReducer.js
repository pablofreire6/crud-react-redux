import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOADING,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
  GET_PRODUCT_DELETE,
  DELETED_PRODUCT_ERROR,
  DELETED_PRODUCT_SUCCESS,
  GET_PRODUCT_EDIT,
  EDIT_PRODUCT_SUCCESS,
} from "../types";

const initialState = {
  products: [],
  error: null,
  loading: false,
  deleteProduct: null,
  productedit: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
    case START_PRODUCTS_DOWNLOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ADD_PRODUCT_ERROR:
    case DOWNLOAD_PRODUCTS_ERROR:
    case DELETED_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOWNLOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCT_DELETE:
      return {
        ...state,
        loading: true,
        deleteProduct: action.payload,
      };
    case DELETED_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteProduct: null,
        products: state.products.filter(({ id }) => id !== action.payload),
      };
    case GET_PRODUCT_EDIT:
      return {
        ...state,
        productedit: action.payload,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        productedit: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    default:
      return state;
  }
}
