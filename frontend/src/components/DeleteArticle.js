import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Button } from "reactstrap";
import { RiDeleteBack2Fill } from "react-icons/ri";

function DeleteArticle(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const handleModal = () => {
    setModalContent({
      title: "Delete Storage Item?",
      body: "Are you sure you want to delete this item?",
    });
    setModal(!modal);
  };

  return (
    <div>
      <span title="Delete" className="card-icons" onClick={handleModal}>
        <RiDeleteBack2Fill size={"1.5em"} color="red" />
      </span>

      {modal ? (
        <DeleteModal
          article={props.article}
          handleModal={handleModal}
          title={modalContent.title}
          body={modalContent.body}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </div>
  );
}

export default DeleteArticle;
