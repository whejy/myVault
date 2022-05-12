import "./App.css";
import React, { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import Form from "./components/Form";
import FormModal from "./components/FormModal";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// export const MyContext = React.createContext();

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, title: "" });
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/vault/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) =>
        setArticles(
          // Add password visibility state
          resp.map((el) => {
            el.visibility = false;
            return el;
          })
        )
      )
      .catch((error) => console.log(error));
  }, []);

  // Return user to login page after logout
  useEffect(() => {
    if (!token["mytoken"]) {
      navigate("/");
      // window.location.href = "/";
    }
  }, [token]);

  // Edit an article
  const editBtn = (article) => {
    setEditArticle(article);
  };

  // Delete an article then refresh article list
  const deleteBtn = (article) => {
    const new_articles = articles.filter((myarticle) => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true;
    });

    setArticles(new_articles);
  };

  // Toggle password visibility on page and refresh article list
  const vis = (article) => {
    const new_article = articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        article.visibility = !article.visibility;
        return article;
      } else {
        return myarticle;
      }
    });
    setArticles(new_article);
  };

  // Update UI after user submits edited article
  const updatedInformation = (article) => {
    const new_article = articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });

    setArticles(new_article);
  };

  // Blank form to be used for new entries
  const articleForm = () => {
    setEditArticle({ username: "", password: "", description: "", url: "" });
    toggle("Add To Storage");
  };

  // Insert new article into article list
  const insertedInformation = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };

  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };

  const toggle = (title = "") => {
    setModal({ isOpen: !modal.isOpen, title: title });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>My Vault</h1>
          <br />
          <br />
          <ArticleList
            vis={vis}
            articles={articles}
            editBtn={editBtn}
            deleteBtn={deleteBtn}
            toggle={toggle}
          />
        </div>

        <div className="col">
          <button onClick={articleForm} className="btn btn-primary">
            New Entry
          </button>
        </div>

        <div className="col">
          <button onClick={logoutBtn} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
      {/* {modal ? <CustomModal toggle={toggle} /> : null} */}
      {editArticle ? (
        <FormModal
          article={editArticle}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
          modal={modal}
          toggle={toggle}
        />
      ) : null}

      {/* <MyContext.Provider value="Passed down value">
        <CompA />
      </MyContext.Provider> */}
    </div>
  );
}

export default App;
