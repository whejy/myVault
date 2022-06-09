import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import Tooltip from "./Tooltip";
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
      {/* <a data-tip="Delete" data-for="delete" data-delay-show="500">
        <ReactTooltip id="delete" place="top" type="info" effect="solid" />
        <span className="card-icons" onClick={handleModal}>
          <RiDeleteBack2Fill size={"1.5em"} color="red" />
        </span>
      </a> */}
      <Tooltip
        message={"Delete"}
        id={"delete"}
        type={"info"}
        position={"top"}
        onClickHandler={handleModal}
        button={<RiDeleteBack2Fill size={"1.5em"} color="red" />}
      />

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
