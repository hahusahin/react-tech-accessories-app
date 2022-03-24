import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import OrderForm from "../components/cart/OrderForm";
import Modal from "../components/layout/Modal";
import useHttp from "../hooks/use-http";
import { sendOrder } from "../lib/api";
import { cartActions } from "../store/cart-slice";
import { uiActions } from "../store/ui-slice";

const Cart = () => {
  const [showForm, setShowForm] = useState(false);

  const { sendRequest, status } = useHttp(sendOrder);

  const showModal = useSelector(state => state.ui.isModalShown)
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showFormHandler = () => {
    setShowForm(true);
  };

  const closeFormHandler = () => {
    setShowForm(false);
  };

  const placeOrderHandler = (userInfo) => {
    dispatch(uiActions.showModal());

    const orderedItems = cartItems.map((item) => {
      return { id: item.id, name: item.name, quantity: item.quantity };
    });
    sendRequest({ userInfo, orderedItems });
  };

  const finishOrderHandler = () => {
    dispatch(uiActions.hideModal())

    if (status === "completed") {
      dispatch(cartActions.clearCart());
      navigate("/")
    }
  };

  return (
    <div className="container">
      {cartItems.length > 0 && (
        <div className="my-4 py-4 text-center">
          <h1>Your Shopping Cart</h1>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <h4 className="text-center text-md-end my-4">
            Total Price: {`$ ${totalPrice.toFixed(2)}`}
          </h4>
          {!showForm && (
            <button
              className="btn btn-lg btn-success"
              onClick={showFormHandler}
            >
              Proceed to Checkout
            </button>
          )}
          {showForm && (
            <OrderForm
              onConfirm={placeOrderHandler}
              onCancel={closeFormHandler}
            />
          )}
        </div>
      )}
      {cartItems.length === 0 && (
        <h2 className="text-center">Your Shopping Cart is Empty!</h2>
      )}
      {showModal && (
        <Modal onBackdropClick={finishOrderHandler}>
          {status === "loading" && <p>Processing Your Order. Please Wait...</p>}
          {(status === "completed" || status === "error") && (
            <React.Fragment>
              <h4 className="mt-2">
                {status === "completed"
                  ? "Successfully Sent the Order"
                  : "An error occured while processing your order. Please try again later!"}
              </h4>
              <div className="text-end">
                <button
                  className={`mt-4 btn btn-lg ${status === "completed" ? "btn-success" : "btn-danger"}`}
                  onClick={finishOrderHandler}
                >
                  Close
                </button>
              </div>
            </React.Fragment>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Cart;
