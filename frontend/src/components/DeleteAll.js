import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import MyModal from "./MyModal";

function DeleteAll(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const handleModal = () => {
    setModalContent({
      title: "Delete All Storage?",
      body: "Are you sure you want to delete all storage items? This cannot be undone.",
    });
    setModal(!modal);
  };
  return (
    <div>
      <Button onClick={handleModal} color="danger">
        Delete All
      </Button>
      {modal ? (
        <MyModal
          handleModal={handleModal}
          title={modalContent.title}
          body={modalContent.body}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </div>
  );
}

export default DeleteAll;
