import React from "react";
import { FormFeedback } from "reactstrap";

function FormModalFeedback(props) {
  return (
    <FormFeedback>{props.urlError ? "Invalid URL" : "Required"}</FormFeedback>
  );
}

export default FormModalFeedback;
