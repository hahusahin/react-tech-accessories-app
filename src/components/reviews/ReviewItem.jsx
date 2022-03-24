import React from "react";
import styles from "./ReviewItem.module.css";

const ReviewItem = (props) => {
  const { name, rating, review } = props.item;

  return (
    <div className={styles.item}>
      <div className={styles.stars}>
        {[...Array(5)].map((_, index) =>
          index < rating ? <span key={index}>&#9733;</span> : <span key={index}>&#9734;</span>
        )}
      </div>
      <p className={styles.review}>{review}</p>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default ReviewItem;
