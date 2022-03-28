import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { sendSignUpCredentials } from "../../lib/api";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";
import Modal from "../layout/Modal";

const SignupForm = (props) => {
  const navigate = useNavigate()

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const cityRef = useRef()
  const zipCodeRef = useRef()
  const addressRef = useRef()

  const showModal = useSelector((state) => state.ui.isModalShown);
  const { sendRequest, data, status } = useHttp(sendSignUpCredentials);
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault()

    dispatch(uiActions.showModal());

    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const city = cityRef.current.value
    const zipCode = zipCodeRef.current.value
    const address = addressRef.current.value

    const credentials = { email, password, returnSecureToken: true }
    const userInfo = { firstName, lastName, email, city, zipCode, address}
    
    sendRequest({credentials, userInfo})

  }

  const closeModalHandler = () => {
    dispatch(uiActions.hideModal());
  }

  useEffect(() => {
    let timeOut;
    if(status === "completed"){
      if(data && data.token && data.userId){
        dispatch(authActions.login({token: data.token, userId: data.userId}))
        timeOut = setTimeout(() => {
          dispatch(uiActions.hideModal())
          navigate(-1, {replace: false})
        }, 1000);
      }
    }
    if(status === "error"){
      timeOut = setTimeout(() => {
        dispatch(uiActions.hideModal())
        dispatch(authActions.logout())
      }, 1500);
    }
    
    return () => {
      if(timeOut){
        clearTimeout(timeOut)
      }
    }
  }, [dispatch, navigate, status, data])
  

  return (
    <Fragment>
      <div className="p-4">
        <h1 className="mb-4 fw-bold text-info text-center">Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className="row g-4 p-3 text-start">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">First name
                <span className="text-warning">&#65121;</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                ref={firstNameRef}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                ref={lastNameRef}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email
                <span className="text-warning">&#65121;</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Password
                <span className="text-warning">&#65121;</span>
              </label>
              <input
                type="password"
                minLength="6"
                className="form-control"
                id="password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                ref={cityRef}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="zipcode" className="form-label">Zipcode</label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                ref={zipCodeRef}
              />
            </div>
            <div className="col">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                ref={addressRef}
              />
            </div>
          </div>
          <button className="d-block mt-2 mb-3 mx-auto btn btn-lg btn-primary" type="submit">
            Create Account
          </button>
          <button
              type="button"
              className="d-block mx-auto btn-dark"
              onClick={() => props.onToggle()}
            >
            Already have an account?
          </button>
        </form>
      </div>
      {showModal && (
        <Modal onBackdropClick={closeModalHandler}>
          {status === "loading" && <p>Please Wait...</p>}
          {(status === "completed" || status === "error") && (
            <h4 className="my-4">
              {status === "completed"
                ? "Successfully Created Your Account"
                : "An error occured while creating your account. Please try again later!"
              }
            </h4>
          )}
        </Modal>
      )}
    </Fragment>
  );
};

export default SignupForm;
