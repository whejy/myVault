import "./App.css";
import React, { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import NewArticle from "./components/NewArticle";
import DeleteAll from "./components/DeleteAll";
import Search from "./components/Search";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";
// import { TokenContext } from "./TokenContext";

function App() {
  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
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

  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>My Vault</h1>
          <br />
          <br />
        </Col>
        <Col>
          <Search
            articles={articles}
            handleSearchResults={handleSearchResults}
          />
        </Col>
        <Col>
          <NewArticle handleArticleList={handleArticleList} />
        </Col>
        <Col>
          <DeleteAll handleArticleList={handleArticleList} />
        </Col>

        <Col>
          <Button color="primary" onClick={logoutBtn}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <TokenContext.Provider value={token}> */}
          <ArticleList
            vis={vis}
            articles={searchResults ? searchResults : articles}
            handleArticleList={handleArticleList}
          />
          {/* </TokenContext.Provider> */}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
