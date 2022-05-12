import React, { useState } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";

function ArticleList(props) {
  const [isActive, setIsActive] = useState(null);
  const [token] = useCookies(["mytoken"]);

  //   Edit an article and reset copied password
  const editBtn = (article) => {
    setIsActive(null);
    props.toggle("Update Item");
    props.editBtn(article);
  };

  //   Delete an article
  const deleteBtn = (article) => {
    APIService.DeleteArticle(article.id, token["mytoken"])
      .then(() => props.deleteBtn(article))
      .catch((error) => console.log(error));
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
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.id}>
              <h2>Username: {article.username}</h2>
              <p>{article.author}</p>
              <span className="test">
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
                  <button
                    onClick={() => deleteBtn(article)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
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
