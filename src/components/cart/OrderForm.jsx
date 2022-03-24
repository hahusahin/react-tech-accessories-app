import React from "react";
import useInput from "../../hooks/use-input";
import styles from "./OrderForm.module.css";

const OrderForm = (props) => {
  const {
    enteredText: firstName,
    valueIsValid: firstNameIsValid,
    inputIsInvalid: firstNameInputNotValid,
    valueChangeHandler: firstNameChangeHandler,
    blurChangeHandler: firstNameBlurHandler,
    resetInputHandler: firstNameResetInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    enteredText: lastName,
    valueIsValid: lastNameIsValid,
    inputIsInvalid: lastNameInputNotValid,
    valueChangeHandler: lastNameChangeHandler,
    blurChangeHandler: lastNameBlurHandler,
    resetInputHandler: lastNameResetInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    enteredText: email,
    valueIsValid: emailIsValid,
    inputIsInvalid: emailInputNotValid,
    valueChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    resetInputHandler: emailResetInput,
  } = useInput((value) => value.trim().includes("@"));

  const {
    enteredText: address,
    valueIsValid: addressIsValid,
    inputIsInvalid: addressInputNotValid,
    valueChangeHandler: addressChangeHandler,
    blurChangeHandler: addressBlurHandler,
    resetInputHandler: addressResetInput,
  } = useInput((value) => value.trim().length > 0);

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid && addressIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({ firstName, lastName, email, address });

    firstNameResetInput();
    lastNameResetInput();
    emailResetInput();
    addressResetInput();
  };

  return (
    <div className={styles.orderform}>
      <h2>Billing Info</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="row g-4 p-3 text-start">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
            />
            {firstNameInputNotValid && (
              <div className={styles.invalid}>Please enter a valid first name!</div>
            )}
          </div>

          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
            />
            {lastNameInputNotValid && (
              <div className={styles.invalid}>Please enter a valid last name!</div>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailInputNotValid && (
              <div className={styles.invalid}>Please enter a valid email!</div>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
            {addressInputNotValid && (
              <div className={styles.invalid}>Please enter a valid address!</div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <button className="btn btn-danger btn-lg me-4" type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary btn-lg ms-4" type="submit" disabled={!formIsValid}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
