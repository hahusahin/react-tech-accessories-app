import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const ProductDetail = (props) => {
  const dispatch = useDispatch();

  const { productDetails } = props;

  const addToCartHandler = () => {
    dispatch(cartActions.addItem(productDetails));
  };

  return (
    <Fragment>
      <h1 className="text-center my-4">Product Details</h1>
      <section className="my-4 border border-white rounded">
        <div className="row p-4 g-4">
          <div className="col-md-4 p-3 d-flex align-items-center border border-white rounded">
            <img className="w-100" src={productDetails.imageUrl} alt="..." style={{maxHeight:"75vh"}}/>
          </div>
          <div className="col-md-8 d-flex flex-column gap-2">
            <h2>{productDetails.name}</h2>
            <div className="mb-2">
              <span className="me-2 fs-5 text-warning">User Rating:</span>
              <span className="me-2 fs-5 text-warning">
                {productDetails.rating > 0
                  ? `${productDetails.rating.toFixed(2)} / 5`
                  : "No Reviews Yet"}
              </span>
            </div>
            <h4 className="text-info">{`$ ${productDetails.price}`}</h4>
            <ul>
              {productDetails.about.split("'\n'").map((paragraph, i) => (
                <li key={i}>{paragraph}</li>
              ))}
            </ul>
            <span>
              <button
                className="btn btn-primary mx-2 px-4"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </span>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProductDetail;
