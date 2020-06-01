import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOADING,
  DOWNLOAD_PRODUCTS_ERROR,
  DOWNLOAD_PRODUCTS_SUCCESS,
  GET_PRODUCT_DELETE,
  DELETED_PRODUCT_ERROR,
  DELETED_PRODUCT_SUCCESS,
  GET_PRODUCT_EDIT,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_SUCCESS,
  START_EDIT_PRODUCT,
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
  payload: true,
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

export function deleteProduct(id) {
  return async (dispatch) => {
    dispatch(getProductDelete(id));

    try {
      await clientAxios.delete(`/products/${id}`);

      dispatch(deleteProductSuccess(id));

      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      dispatch(deleteProductError(true));
    }
  };
}

const getProductDelete = (id) => ({
  type: GET_PRODUCT_DELETE,
  payload: id,
});

const deleteProductError = (error) => ({
  type: DELETED_PRODUCT_ERROR,
  payload: error,
});

const deleteProductSuccess = (id) => ({
  type: DELETED_PRODUCT_SUCCESS,
  payload: id,
});

export function getProductToEdit(product) {
  return (dispatch) => {
    dispatch(getProductAction(product));
  };
}

const getProductAction = (product) => {
  return {
    type: GET_PRODUCT_EDIT,
    payload: product,
  };
};

export function startEditingProduct(product) {
  return async (dispatch) => {
    dispatch(editProduct(product));

    try {
      const result = await clientAxios.put(`/products/${product.id}`, product);
      console.log(result);
    } catch (error) {}
  };
}

const editProduct = (product) => {
  return {
    type: START_EDIT_PRODUCT,
    payload: product,
  };
};
