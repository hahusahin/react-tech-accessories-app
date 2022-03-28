import React, { Fragment, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import useHttp from "../hooks/use-http";
import { getUserDetails } from "../lib/api";

const UserAccount = () => {
  const params = useParams();
  const { userId } = params;
  
  const { sendRequest, data: userInfo, status, error } = useHttp(getUserDetails, true);

  useEffect(() => {
    sendRequest(userId);
  }, [sendRequest, userId]);

  return (
    <section className="container">
      {status === "loading" && <Spinner />}
      {status === "completed" && (
        <Fragment>
          <h1 className="text-center mb-4 text-info">Account Info</h1>
          <div
            className="card mb-3 text-dark mx-auto"
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <FaUserCircle size="4rem" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text mb-2">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                  <p className="card-text mb-2">
                    <MdEmail />
                    <span className="ms-2">{userInfo.email}</span>
                  </p>
                  <p className="card-text mb-2 lh-base">
                    <MdLocationOn />
                    <span className="ms-2">{`${userInfo.address} - ${userInfo.city} - ${userInfo.zipCode}`}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {status === "error" && <p>{error}</p>}
    </section>
  );
};

export default UserAccount;
