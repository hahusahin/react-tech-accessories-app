import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        status: "loading",
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        status: "completed",
        data: action.payload,
        error: null,
      };
    case "ERROR":
      return {
        status: "error",
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "loading" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "LOADING" });

      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", payload: responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: error.message || "Something went wrong!!!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
