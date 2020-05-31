import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/ProductsActions";
import Swal from "sweetalert2";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteProd = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProduct(id));
      }
    });
  };

  const redirectEdit = (product) => {
    history.push(`/product/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redirectEdit(product)}
        >
          Edit
        </button>
        <button
          onClick={() => deleteProd(id)}
          className="btn btn-danger"
          type="button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
