import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import styles from "./ItemQuantity.module.css";

const ItemQuantity = (props) => {
  const { id, quantity } = props.item;

  const dispatch = useDispatch();

  const decrementItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  const incrementItem = () => {
    dispatch(cartActions.addItem(props.item));
  };

  return (
    <div className={styles.selector}>
      <button
        className="btn btn-light"
        disabled={quantity <= 1}
        onClick={decrementItem}
      >
        &mdash;
      </button>
      <input type="text" readOnly value={quantity} />
      <button className="btn btn-light" onClick={incrementItem}>
        &#xff0b;
      </button>
    </div>
  );
};

export default ItemQuantity;
