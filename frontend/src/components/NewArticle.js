import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import { MdOutlineLibraryAdd } from "react-icons/md";
import FormModal from "./FormModal";
import Tooltip from "./Tooltip";

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
      <Tooltip
        message={"Add New"}
        type={"success"}
        position={"top"}
        id={"addnew"}
        onClickHandler={handleModal}
        button={
          <Button className="button-outline" outline color="success">
            <MdOutlineLibraryAdd color="white" size={"1.5em"} />
          </Button>
        }
      />

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
