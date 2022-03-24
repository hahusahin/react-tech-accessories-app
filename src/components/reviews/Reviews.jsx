import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Reviews = (props) => {
  const [showForm, setShowForm] = useState(false);

  const { loadedReviews } = props;

  const productInfo = {
    productId: props.productId,
    currentRating: props.rating,
    numOfReviews: loadedReviews.length,
  };

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
      {!showForm && (
        <div className="text-center">
          <button
            className="btn btn-success px-3"
            onClick={() => setShowForm(true)}
          >
            Review Product
          </button>
        </div>
      )}
      {showForm && (
        <ReviewForm onReload={props.onReload} productInfo={productInfo} />
      )}
    </section>
  );
};

export default Reviews;
