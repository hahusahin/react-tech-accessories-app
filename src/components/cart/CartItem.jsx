import React from "react";
import styles from "./CartItem.module.css";
import ItemQuantity from "./ItemQuantity";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const { id, name, imageUrl, quantity, totalPrice } = props.item;
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(cartActions.deleteFromCart({ id, quantity }));
  };

  return (
    <div className={`${styles.item} row gap-3 align-items-center`}>
      <div className="col">
        <img src={imageUrl} alt="item" />
      </div>
      <div className="col-md-6 text-md-start">
        <span className={styles.name}>{name}</span>
      </div>
      <div className="col-md-4 d-flex align-items-center gap-4 justify-content-center">
        <ItemQuantity item={props.item}/>
        <span className={styles.price}>{`$ ${totalPrice.toFixed(2)}`}</span>
        <button className={styles.delete} onClick={onDeleteHandler}>
          <BsTrash size="1.5rem" color="white" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
