import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";
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
      <span title="Delete All" className="card-icons" onClick={handleModal}>
        <Button className="button-outline" outline color="danger">
          <RiDeleteBinLine color="white" size={"1.5em"} />
        </Button>
      </span>
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
