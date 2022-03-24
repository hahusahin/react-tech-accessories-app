import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-light"
        role="status"
        style={{ width: "7.5rem", height: "7.5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
