import { useState } from "react";

function useInput(validateInput) {
  const [enteredText, setEnteredText] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInput(enteredText);
  const inputIsInvalid = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const blurChangeHandler = () => {
    setIsTouched(true);
  };

  const resetInputHandler = () => {
    setEnteredText("");
    setIsTouched(false);
  };

  return {
    enteredText,
    valueIsValid,
    inputIsInvalid,
    valueChangeHandler,
    blurChangeHandler,
    resetInputHandler,
  };
}

export default useInput;
