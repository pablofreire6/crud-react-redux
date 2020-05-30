import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOADING,
  DOWNLOAD_PRODUCTS_ERROR,
  DOWNLOAD_PRODUCTS_SUCCESS,
} from "../types";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewProduct(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      await clientAxios.post("/products", product);

      dispatch(addProductSuccess(product));

      Swal.fire("Correct", "The product was correctly added", "success");
    } catch (e) {
      dispatch(addProductError(true));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error, please try again",
      });
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

export function getProducts() {
  return async (dispatch) => {
    dispatch(downloadProducts());

    try {
      const response = await clientAxios.get("/products");

      dispatch(downloadProductsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(downloadProductsError(true));
    }
  };
}

const downloadProducts = () => ({
  type: START_PRODUCTS_DOWNLOADING,
  payload: true,
});

const downloadProductsSuccess = (products) => ({
  type: DOWNLOAD_PRODUCTS_SUCCESS,
  payload: products,
});

const downloadProductsError = (error) => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true,
});
