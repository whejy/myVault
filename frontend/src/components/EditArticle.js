import React, { useState } from "react";
import Tooltip from "./Tooltip";
import { RiEdit2Fill } from "react-icons/ri";
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
      <Tooltip
        message={"Edit"}
        id={"edit"}
        type={"info"}
        position={"top"}
        onClickHandler={handleModal}
        button={<RiEdit2Fill size={"1.5em"} />}
      />

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
