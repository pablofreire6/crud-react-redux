import { ADD_PRODUCT, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR } from "../types";
import clientAxios from "../config/axios";

export function createNewProduct(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      await clientAxios.post("/products", product);

      dispatch(addProductSuccess(product));
    } catch (e) {
      dispatch(addProductError(true));
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
});

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

const addProductError = (error) => ({
  type: ADD_PRODUCT_ERROR,
  payload: error,
});
