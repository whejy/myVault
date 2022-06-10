import React from "react";
import { Spinner } from "reactstrap";

function LoadingSpinner() {
  return (
    <div>
      <Spinner color="dark" size="">
        Loading...
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
