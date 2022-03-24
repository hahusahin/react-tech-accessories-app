import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "./StarRating.module.css"

const StarRating = (props) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => props.onRatingSelected(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(props.rating)}
          >
            <span>
              {index <= (hover || props.rating) ? <BsStarFill size="1.5rem"/> : <BsStar size="1.5rem"/>}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
