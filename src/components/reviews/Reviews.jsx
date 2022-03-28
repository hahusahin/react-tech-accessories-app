import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Reviews = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { loadedReviews } = props;

  const productInfo = {
    productId: props.productId,
    currentRating: props.rating,
    numOfReviews: loadedReviews.length,
  };

  const showFormHandler = () => {
    if(isLoggedIn){
      setShowForm(true)
    } else {
      setShowWarning(true)
    }
  }

  return (
    <section className="my-5">
      <div className="my-4 py-2">
        <h3 className="text-center mb-4">Product Reviews</h3>
        {loadedReviews.length > 0 ? (
          loadedReviews.map((item, index) => (
            <ReviewItem key={index} item={item} />
          ))
        ) : (
          <h5 className="text-center my-4">No Reviews Yet</h5>
        )}
      </div>
      {!showForm && !showWarning && (
        <div className="text-center">
          <button
            className="btn btn-success px-3"
            onClick={showFormHandler}
          >
            Review Product
          </button>
        </div>
      )}
      {showWarning && (
        <div className="text-center">
          <p>You should be logged in to make a review.</p>
          <Link to="/login" className="btn btn-danger">Login</Link>
        </div>
      )}
      {showForm && (
        <ReviewForm onReload={props.onReload} productInfo={productInfo} />
      )}
    </section>
  );
};

export default Reviews;
