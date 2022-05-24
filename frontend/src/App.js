import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import ArticleList from "./components/ArticleList";
import FormModal from "./components/FormModal";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import APIService from "./APIService";

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState({
    single: false,
    all: false,
  });
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("username");
  const [modal, setModal] = useState({ isOpen: false, title: "" });
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();
  let initialRender = useRef(true);

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
    }
  }, [token]);

  // Update Search results as user modifies query. Ignore on initial page render.
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      Search();
    }
  }, [searchFilter, searchQuery, articles]);

  // Store user's search filter
  const handleSearchFilter = (selector) => {
    setSearchFilter(selector);
  };

  // Store user's search query
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // Allows user to search for an article using radio button filters
  const Search = () => {
    if (searchQuery) {
      setSearchResults(
        articles.filter((article) =>
          article[searchFilter]
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
      // If user erases search input, trigger render of original article list
    } else {
      setSearchResults(null);
    }
  };

  // Edit an article
  const editBtn = (article) => {
    setEditArticle(article);
  };

  // User deletes all storage items at once
  const deleteAll = () => {
    APIService.DeleteAll(token["mytoken"])
      .then(() => console.log("Deleted All"))
      .catch((error) => console.log(error));

    setArticles([]);
    toggle();
  };

  // Delete an article then refresh article list
  const deleteBtn = (article) => {
    APIService.DeleteArticle(article.id, token["mytoken"])
      .then(() => console.log(article))
      .catch((error) => console.log(error));

    const new_articles = articles.filter((myarticle) => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true;
    });

    setArticles(new_articles);

    // If on search results page, refresh results
    if (searchResults) {
      const new_articles = searchResults.filter((myarticle) => {
        if (myarticle.id === article.id) {
          return false;
        }
        return true;
      });
      setSearchResults(new_articles);
    }

    toggle();
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
    const new_articles = [article, ...articles];
    setArticles(new_articles);
  };

  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };

  // Toggle modal and its content
  const toggle = (title = "", deleteCheck = null, deleteCheckAll = null) => {
    setModal({ isOpen: !modal.isOpen, title: title });

    if (deleteCheck) {
      setDeleteConfirm({ all: false, single: true });
    } else if (deleteCheckAll) {
      setDeleteConfirm({ all: true, single: false });
    } else {
      setDeleteConfirm({ all: false, single: false });
    }
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
            articles={searchResults ? searchResults : articles}
            editBtn={editBtn}
            toggle={toggle}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
          />
        </div>

        <div className="col">
          <button onClick={articleForm} className="btn btn-primary">
            New Entry
          </button>
        </div>

        <div className="col">
          <input
            placeholder="Search"
            onChange={(e) => handleSearchQuery(e.target.value)}
          />
          <div onChange={(e) => handleSearchFilter(e.target.value)}>
            <input
              defaultChecked="checked"
              type="radio"
              value="username"
              name="search-query"
            />{" "}
            Username
            <input type="radio" value="description" name="search-query" />
            Description
            <input type="radio" value="url" name="search-query" /> URL
          </div>
        </div>

        <div className="col">
          <button onClick={logoutBtn} className="btn btn-primary">
            Logout
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => {
              toggle("Delete ALL", false, true);
            }}
            className="btn btn-danger"
          >
            Delete All
          </button>
        </div>
      </div>
      {editArticle ? (
        <FormModal
          article={editArticle}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
          modal={modal}
          toggle={toggle}
          deleteConfirm={deleteConfirm}
          deleteBtn={deleteBtn}
          deleteAll={deleteAll}
        />
      ) : null}

      {/* <MyContext.Provider value="Passed down value">
        <CompA />
      </MyContext.Provider> */}
    </div>
  );
}

export default App;
