import React, { Fragment, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { sendLoginCredentials } from '../../lib/api';
import { authActions } from '../../store/auth-slice';
import { uiActions } from '../../store/ui-slice';
import Modal from '../layout/Modal';

const LoginForm = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const showModal = useSelector((state) => state.ui.isModalShown);
  const { sendRequest, data, status } = useHttp(sendLoginCredentials);

  const submitHandler = (event) => {
    event.preventDefault()
 
    dispatch(uiActions.showModal());

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const credentials = { email, password, returnSecureToken: true }
    sendRequest(credentials)
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
      <div className="w-100 p-4 m-auto text-center" style={{ maxWidth: "20rem" }}>
        <h1 className="mb-4 fw-bold text-info">Login</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email">Your Email</label>
            <input className="form-control" type="email" id="email" ref={emailRef} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Your Password</label>
            <input className="form-control" type="password" id="password" ref={passwordRef} required />
          </div>
          <button className="mt-2 w-100 btn btn-lg btn-primary" type="submit">Login</button>
          <hr />
          <button
              type="button"
              className="btn-dark"
              onClick={() => props.onToggle()}
            >
            Create new account
          </button>
        </form>
      </div>
      {showModal && (
        <Modal onBackdropClick={closeModalHandler}>
          {status === "loading" && <p>Please wait!!!</p>}
          {(status === "completed" || status === "error") && (
            <h4 className="my-4">
              {status === "completed"
                ? "Successfully logged in"
                : "An error occured while logging in. Please try again later!"
              }
            </h4>
          )}
        </Modal>
      )}
    </Fragment>
  );
}

export default LoginForm