import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import Popup from "../ui/Popup";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const isToastShown = useSelector(state => state.ui.isToastShown)
  const toastBody = useSelector(state => state.ui.toastBody)

  const { productDetails } = props;

  const addToCartHandler = () => {
    dispatch(cartActions.addItem(productDetails));
    dispatch(uiActions.showToast(productDetails.name));
  };

  return (
    <Fragment>
      {isToastShown && <Popup header="Added to your cart" body={toastBody}/>}
      <h1 className="text-center my-4">Product Details</h1>
      <section className="my-4">
        <div className="row p-4 g-4">
          <div className="col-md-4 p-3 d-flex align-items-center">
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
