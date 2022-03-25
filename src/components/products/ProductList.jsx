import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { getAllProducts } from "../../lib/api";
import Popup from "../ui/Popup";
import Spinner from "../ui/Spinner";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const {
    sendRequest,
    data: loadedProducts,
    status,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const isToastShown = useSelector(state => state.ui.isToastShown)
  const toastBody = useSelector(state => state.ui.toastBody)

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error" || (status === "completed" && loadedProducts.length === 0)) {
    return <p>{error}</p>;
  }

  return (
    <Fragment>
      <Popup show={isToastShown} header="Added to your cart" body={toastBody}/>
      <h1 className="py-4 text-center">Products</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 g-lg-4 mx-1">
        {loadedProducts.map((product) => (
          <ProductItem key={product.id} item={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductList;
