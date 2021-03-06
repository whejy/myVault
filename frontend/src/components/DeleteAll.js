import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import Tooltip from "./Tooltip";
import DeleteModal from "./DeleteModal";
import { RiDeleteBinLine } from "react-icons/ri";

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
    <span>
      <Tooltip
        message={"Delete All"}
        type={"error"}
        position={"top"}
        id={"deleteall"}
        onClickHandler={handleModal}
        button={
          <Button className="button-outline" outline color="danger">
            <RiDeleteBinLine color="white" size={"1.5em"} />
          </Button>
        }
      />
      {modal ? (
        <DeleteModal
          handleModal={handleModal}
          title={modalContent.title}
          body={modalContent.body}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </span>
  );
}

export default DeleteAll;
