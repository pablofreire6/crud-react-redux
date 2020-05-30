import React from "react";
import { createNewProduct } from "../actions/ProductsActions";
import { useDispatch, useSelector } from "react-redux";

const NewProduct = ({ history }) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const addProduct = (product) => dispatch(createNewProduct(product));

  const submitNewProduct = (e) => {
    e.preventDefault();

    if (name.trim() === "" || price <= 0) {
      return;
    }

    addProduct({ name, price });

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>
            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <button className="btn btn-primary font-weight text-uppercase w-100 d-block">
                Save
              </button>
            </form>

            {loading ? <p>Loading...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Error found
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
