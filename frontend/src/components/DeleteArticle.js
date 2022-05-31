import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

function DeleteArticle(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const handleModal = () => {
    setModalContent({
      title: "Delete Storage Item?",
      body: `Are you sure you want to delete your storage item for username: ${props.article.username}?`,
    });
    setModal(!modal);
  };

  return (
    <div>
      <button onClick={handleModal} className="btn btn-danger">
        Delete
      </button>

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
