import React, { useState } from "react";
import { Button } from "reactstrap";
import FormModal from "./FormModal";

function EditArticle(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const handleModal = () => {
    setModalContent({
      title: "Update Storage",
      body: null,
    });
    setModal(!modal);
  };
  return (
    <div>
      <Button onClick={handleModal} color="primary">
        Update
      </Button>
      {modal ? (
        <FormModal
          title={modalContent.title}
          handleModal={handleModal}
          article={props.article}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </div>
  );
}

export default EditArticle;
