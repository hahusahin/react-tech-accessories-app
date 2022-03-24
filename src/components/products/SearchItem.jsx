import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css"

const SearchItem = (props) => {
  const { id, name, imageUrl, price } = props.item;

  return (
    <div className={`${styles.item} row gap-3 align-items-center`}>
      <div className="col">
        <img src={imageUrl} alt="item" />
      </div>
      <div className="col-md-8 text-center text-md-start">
        <Link to={`/product/${id}`}>
          <span className={styles.name}>{name}</span>
        </Link>
      </div>
      <div className="col text-center text-md-start">
        <span className={styles.price}>{`$ ${price.toFixed(2)}`}</span>
      </div>
    </div>
  );
};

export default SearchItem;
