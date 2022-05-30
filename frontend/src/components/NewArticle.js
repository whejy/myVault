import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import MyModal from "./MyModal";

function DeleteAll(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const article = { username: "", password: "", description: "", url: "" };

  const handleModal = () => {
    setModalContent({
      title: "Add To Storage",
      body: null,
    });
    setModal(!modal);
  };

  return (
    <div>
      <Button onClick={handleModal} color="success">
        New Entry
      </Button>
      {modal ? (
        <MyModal
          handleModal={handleModal}
          title={modalContent.title}
          body={modalContent.body}
          article={article}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </div>
  );
}

export default DeleteAll;
