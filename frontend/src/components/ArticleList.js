import React, { useState } from "react";
import DeleteArticle from "./DeleteArticle";
import DeleteAll from "./DeleteAll";

function ArticleList(props) {
  const [isActive, setIsActive] = useState(null);

  //   Edit an article and reset copied password
  const editBtn = (article, deleteCheck = null) => {
    setIsActive(null);
    if (deleteCheck) {
      props.toggle("Confirm Delete", deleteCheck);
    } else {
      props.toggle("Update Item");
    }
    props.editBtn(article);
  };

  //   Send to App password to be hidden
  const vis = (article) => {
    props.vis(article);
  };

  //   Hide password function which runs when article.visibility = false
  function hidePassword(password) {
    return password.split("").map((letter) => "*");
  }

  return (
    <div>
      <DeleteAll
        // token={props.token}
        handleArticleList={props.handleArticleList}
      />
      {props.articles.length < 1 && (
        <span id="empty-search">Sorry, we couldn't find any results.</span>
      )}
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.id}>
              <h2>Username: {article.username}</h2>
              <p>{article.author}</p>
              <span className="">
                <h2>
                  Password:{" "}
                  {article.visibility
                    ? article.password
                    : hidePassword(article.password)}
                </h2>
                <button
                  className={
                    isActive == article.id
                      ? "btn btn-info btn-sm"
                      : "btn btn-outline-info btn-sm"
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(article.password);
                    setIsActive(article.id);
                  }}
                >
                  {isActive == article.id ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  onClick={() => vis(article)}
                  className="btn btn-primary"
                >
                  Show
                </button>
              </span>
              {article.description && <p>Description: {article.description}</p>}
              {article.url && (
                <p>
                  <a href={article.url} target="_blank" rel="noreferrer">
                    <img src={article.url + "/favicon.ico"} alt=""></img>
                  </a>
                </p>
              )}

              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn btn-primary"
                    onClick={() => editBtn(article)}
                  >
                    Update
                  </button>
                </div>

                <div className="col">
                  <DeleteArticle
                    // token={props.token}
                    article={article}
                    editBtn={editBtn}
                    handleArticleList={props.handleArticleList}
                  />
                  {/* <button
                    onClick={() => editBtn(article, true)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button> */}
                </div>
              </div>

              <hr className="hrclass" />
            </div>
          );
        })}
    </div>
  );
}

export default ArticleList;
