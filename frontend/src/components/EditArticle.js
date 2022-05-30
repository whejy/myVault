import React, { useState } from "react";
import { Button } from "reactstrap";
import MyModal from "./MyModal";

function EditArticle(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  //   const updatedInformation = (article) => {
  //     const new_article = articles.map((myarticle) => {
  //       if (myarticle.id === article.id) {
  //         return article;
  //       } else {
  //         return myarticle;
  //       }
  //     });

  //     setArticles(new_article);
  //   };

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
        <MyModal
          title={modalContent.title}
          body={modalContent.body}
          handleModal={handleModal}
          article={props.article}
          handleArticleList={props.handleArticleList}
        />
      ) : null}
    </div>
  );
}

export default EditArticle;
