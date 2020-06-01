import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startEditingProduct } from "../actions/ProductsActions";

const EditProduct = ({ history }) => {
  const [product, setProduct] = React.useState({ name: "", price: "" });
  const productEdit = useSelector((state) => state.products.productedit);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setProduct(productEdit);
  }, [productEdit]);

  const { name, price } = product;

  const submitEdit = (e) => {
    e.preventDefault();

    dispatch(startEditingProduct(product));

    history.push("/");
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>
            <form onSubmit={submitEdit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product name"
                  name="name"
                  value={name}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary font-weight text-uppercase w-100 d-block">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
