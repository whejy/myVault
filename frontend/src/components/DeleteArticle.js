import React from "react";
import APIService from "../APIService";

function DeleteArticle(props) {
  return (
    <div>
      <button
        onClick={() => props.editBtn(props.article, true)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteArticle;
