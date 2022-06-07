import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import { MdOutlineLibraryAdd } from "react-icons/md";
import FormModal from "./FormModal";

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
    <span>
      <span title="Add New" className="card-icons" onClick={handleModal}>
        <Button outline color="success">
          <MdOutlineLibraryAdd color="white" size={"1.5em"} />
        </Button>
      </span>
      {modal ? (
        <FormModal
          title={modalContent.title}
          handleModal={handleModal}
          article={article}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </span>
  );
}

export default DeleteAll;
