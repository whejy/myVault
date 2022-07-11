import "./App.css";
import React, { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import NewArticle from "./components/NewArticle";
import DeleteAll from "./components/DeleteAll";
import Search from "./components/Search";
import Logout from "./components/Logout";
import LoadingSpinner from "./components/Spinner";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import randomColor from "randomcolor";

function App() {
  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animateDelete, setAnimateDelete] = useState([]);
  const [animateInsert, setAnimateInsert] = useState([]);
  const [articlesChanged, setArticlesChanged] = useState([false]);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  // Fetch article list on page load
  useEffect(() => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/vault/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setArticles(
          // Add password visibility state and random color for card decoration
          resp.map((el) => {
            el.visibility = false;
            el.color = getColor();
            return el;
          })
        );
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Return user to login page after logout
  useEffect(() => {
    if (!token["mytoken"]) {
      navigate("/");
    }
  }, [token]);

  // Animate all articles after Search changes
  useEffect(() => {
    setTimeout(() => {
      setAnimateInsert([]);
    }, 2100);
  }, [searchResults]);

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
      setHasSearched(true);
      // If user erases search input, trigger render of original article list
    } else {
      setHasSearched(false);
      setSearchResults(null);
      // If insert or update has not been called, user has reset search results -
      // Animate all articles
      if (!articlesChanged[0]) {
        setAnimateInsert(articles);
      }
    }

    // Change state without triggering re-render
    articlesChanged[0] = false;
  };

  // Refreshes Article List after user Deletes, Updates or Adds an item
  const handleArticleList = (article, action) => {
    if (action === "delete") {
      let new_articles = [];
      if (article) {
        // Delete single
        new_articles = articles.filter((myarticle) => {
          if (myarticle.id === article.id) {
            setAnimateDelete([article]);
            return false;
          }
          return true;
        });
      } else {
        // Delete all
        setAnimateDelete(articles);
      }
      // Allow animation to play out before triggering re-render
      setTimeout(() => {
        setArticles(new_articles);
      }, 900);
    }

    if (action === "update") {
      const new_article = articles.map((myarticle) => {
        if (myarticle.id === article.id) {
          article.color = getColor();
          return article;
        } else {
          return myarticle;
        }
      });
      setArticlesChanged([true]);
      setArticles(new_article);
    }

    if (action === "insert" && article) {
      article.color = getColor();
      setArticles([article, ...articles]);
      setAnimateInsert([article]);
      setArticlesChanged([true]);
    }
  };

  // Get a random color for card theme
  const getColor = () => {
    return randomColor({ format: "rgba", alpha: 0.5 });
  };

  return (
    <Container fluid>
      <Row>
        <Col className="app-title">myVault.</Col>
      </Row>
      <Row style={{ paddingBottom: "5px" }}>
        <Col className="d-flex g-4 justify-content-center">
          <NewArticle handleArticleList={handleArticleList} />
          <DeleteAll handleArticleList={handleArticleList} />
          <Logout />
        </Col>
      </Row>
      <Container className="d-flex justify-content-center">
        <Row className="d-flex justify-content-center">
          <Col xs={"12"}>
            <Search
              handleSearchResults={handleSearchResults}
              animateInsert={animateInsert}
              articlesChanged={articlesChanged}
            />
          </Col>
        </Row>
      </Container>
      <ArticleList
        spinner={isLoading ? <LoadingSpinner /> : null}
        hasSearched={hasSearched}
        articles={searchResults ? searchResults : articles}
        handleArticleList={handleArticleList}
        animateDelete={animateDelete}
        animateInsert={animateInsert}
      />
    </Container>
  );
}

export default App;
