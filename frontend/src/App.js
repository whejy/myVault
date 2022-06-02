import "./App.css";
import React, { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import NewArticle from "./components/NewArticle";
import DeleteAll from "./components/DeleteAll";
import Search from "./components/Search";
import Logout from "./components/Logout";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

function App() {
  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  // Fetch article list on page load
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

  // Allow user to search for an article and filter search with radio buttons
  const handleSearchResults = (searchQuery, searchFilter) => {
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

  // Refreshes Article List after user Deletes, Updates or Adds an item
  const handleArticleList = (article, action) => {
    if (action === "delete") {
      let new_articles = [];
      if (article) {
        new_articles = articles.filter((myarticle) => {
          if (myarticle.id === article.id) {
            return false;
          }
          return true;
        });
      }
      setArticles(new_articles);
    }

    if (action === "update") {
      const new_article = articles.map((myarticle) => {
        if (myarticle.id === article.id) {
          return article;
        } else {
          return myarticle;
        }
      });
      setArticles(new_article);
    }

    if (action === "insert") {
      setArticles([article, ...articles]);
    }
  };

  return (
    <Container>
      <Row>
        <Col tag={"h1"}>
          My Vault
          <br />
          <br />
        </Col>

        <Col className="d-flex justify-content-end">
          <Logout />
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <Search
            articles={articles}
            handleSearchResults={handleSearchResults}
          />
        </Col>
        <Col>
          <NewArticle handleArticleList={handleArticleList} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DeleteAll handleArticleList={handleArticleList} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ArticleList
            articles={searchResults ? searchResults : articles}
            handleArticleList={handleArticleList}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
