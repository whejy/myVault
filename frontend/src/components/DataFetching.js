import React, { useReducer, useEffect } from "react";
import axios from "axios";

// Fetching API using useReducer and useEffect. Includes a 'loading' screen while data is being fetched

const initialState = {
  loading: true,
  article: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        loading: false,
        article: action.payload,
        error: "",
      };

    case "ERROR":
      return {
        loading: false,
        article: {},
        error: "Error in data fetching",
      };
  }
};

function DataFetching() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((resp) => {
        dispatch({ type: "SUCCESS", payload: resp.data });
      })

      .catch((error) => {
        dispatch({ type: "ERROR" });
      });
  }, []);

  return (
    <div>
      {state.loading ? "Loading..." : state.article.body}
      {state.error ? state.error : null}
    </div>
  );
}

export default DataFetching;
