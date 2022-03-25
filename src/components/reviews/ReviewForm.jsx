import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { sendReviewAndUpdateRating } from "../../lib/api";
import { uiActions } from "../../store/ui-slice";
import Modal from "../layout/Modal";

import StarRating from "./StarRating";

const ReviewForm = (props) => {
  const [rating, setRating] = useState(0);

  const nameRef = useRef();
  const reviewRef = useRef();
  const { productId, currentRating, numOfReviews } = props.productInfo;

  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.ui.isModalShown);

  const { sendRequest, status } = useHttp(sendReviewAndUpdateRating);

  const getRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(uiActions.showModal());

    const name = nameRef.current.value || "Anonymous User";
    const review = reviewRef.current.value;

    const selectedRating = (rating === 0 ? 1 : rating)
    const reviewData = { name: name, rating: selectedRating, review: review };
    const newRating = (numOfReviews * currentRating + selectedRating) / (numOfReviews + 1);

    sendRequest({ productId, reviewData, rating: newRating });
  };

  const closeModalHandler = () => {
    dispatch(uiActions.hideModal());

    if (status === "completed") {
      props.onReload();
    }
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div
          className="d-flex flex-column align-items-center gap-3 my-4 mx-auto"
          style={{ maxWidth: "40rem" }}
        >
          <h3 className="text-warning">Your Review</h3>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <span className="fs-5">Your Rating</span>
            <StarRating rating={rating} onRatingSelected={getRating} />
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            ref={nameRef}
            required
          />
          <textarea
            type="text"
            className="form-control"
            placeholder="Your review"
            rows="4"
            ref={reviewRef}
          ></textarea>
          <button type="submit" className="btn btn-success">
            Add Review
          </button>
        </div>
      </form>
      {showModal && (
        <Modal onBackdropClick={closeModalHandler}>
          {status === "loading" && <p>Adding Your Review. Please Wait...</p>}
          {(status === "completed" || status === "error") && (
            <React.Fragment>
              <h4 className="mt-2">
                {status === "completed"
                  ? "Successfully Sent your Review"
                  : "An error occured while sending your review. Please try again later!"}
              </h4>
              <div className="text-end">
                <button
                  className={`mt-4 btn btn-lg ${
                    status === "completed" ? "btn-success" : "btn-danger"
                  }`}
                  onClick={closeModalHandler}
                >
                  Close
                </button>
              </div>
            </React.Fragment>
          )}
        </Modal>
      )}
    </Fragment>
  );
};

export default ReviewForm;
