import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/products/ProductDetail";
import Reviews from "../components/reviews/Reviews";
import Spinner from "../components/ui/Spinner";
import useHttp from "../hooks/use-http";
import { getProductDetails } from "../lib/api";

const Product = () => {  
  const params = useParams();
  const { productId } = params;

  const { sendRequest, data, status, error } = useHttp(getProductDetails, true);

  useEffect(() => {
    sendRequest(productId);
  }, [sendRequest, productId]);

  const onReloadHandler = () => {
    sendRequest(productId);
  };

  return (
    <div className="container">
      {status === "loading" && <Spinner />}
      {status === "completed" && (
        <>
          <ProductDetail productDetails={{...data.productInfo, id: productId}} />
          <Reviews
            loadedReviews={data.productReviews}
            productId={productId}
            rating={data.productInfo.rating}
            onReload={onReloadHandler}
          />
        </>
      )}
      {status === "error" && <p>{error}</p>}
    </div>
  );
};

export default Product;
