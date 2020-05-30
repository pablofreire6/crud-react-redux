import React from "react";
import { getProducts } from "../actions/ProductsActions";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";

const Products = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadProducts = () => dispatch(getProducts());
    loadProducts();
  }, []);

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  return (
    <>
      <h2 className="text-center m-5">List of Products</h2>

      {error ? (
        <p className="font-weight-bold alert alert-danger text-center">
          An error has occured
        </p>
      ) : null}

      {loading ? <p className="text-center">Loading...</p> : null}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0
            ? products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default Products;
