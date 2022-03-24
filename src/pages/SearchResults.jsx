import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchItem from "../components/products/SearchItem";
import Spinner from "../components/ui/Spinner";
import useHttp from "../hooks/use-http";
import { getAllProducts } from "../lib/api";

const SearchResults = () => {
  const params = new URLSearchParams(useLocation().search);
  const query = params.get("q");

  const { sendRequest, data, status, error } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "loading") {
    return (
      <div className="container text-center">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container text-center">
        <p>{error}</p>
      </div>
    );
  }

  const results = data.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.about.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    return (
      <div className="container text-center">
        <h2>Can't find a product related to your search!!!</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <Fragment>
        <h1 className="my-5 text-center">Search Results</h1>
        {results.map((product) => (
            <SearchItem key={product.id} item={product} />
          ))}
      </Fragment>
    </div>
  );
};

export default SearchResults;
