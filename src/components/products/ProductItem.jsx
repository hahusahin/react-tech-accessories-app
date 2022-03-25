import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, name, imageUrl, price } = props.item;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItem(props.item));
    dispatch(uiActions.showToast(name));
  };

  return (
    <div className="col text-center">
      <div className={`card h-100 py-2 ${styles.item}`}>
        <Link to={`/product/${id}`}>
          <img className="card-img-top img-fluid" src={imageUrl} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{`$ ${price}`}</p>
          </div>
        </Link>
        <button
          className="btn btn-primary mt-auto mx-auto px-4"
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
