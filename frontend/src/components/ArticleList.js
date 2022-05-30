import React, { useState } from "react";
import EditArticle from "./EditArticle";
import DeleteArticle from "./DeleteArticle";
import DeleteAll from "./DeleteAll";
import NewArticle from "./NewArticle";

function ArticleList(props) {
  const [isActive, setIsActive] = useState(null);

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
                  <EditArticle
                    article={article}
                    handleArticleList={props.handleArticleList}
                  />
                </div>

                <div className="col">
                  <DeleteArticle
                    article={article}
                    handleArticleList={props.handleArticleList}
                  />
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
