import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/ProductsActions";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();

  const deleteProd = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td>
        <Link to={`/product/edit/${id}`} className="btn btn-primary mr-2">
          Edit
        </Link>
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
