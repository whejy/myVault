import React, { useEffect, useState } from "react";
import EditArticle from "./EditArticle";
import DeleteArticle from "./DeleteArticle";
import Tooltip from "./Tooltip";
import {
  Button,
  Container,
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  CardText,
  CardHeader,
  CardSubtitle,
} from "reactstrap";
import { FaCopy, FaRegCopy } from "react-icons/fa";
import { BiHide, BiShow } from "react-icons/bi";
import { ImHappy } from "react-icons/im";

function ArticleList(props) {
  const [isActive, setIsActive] = useState(null);

  // Dynamic auto-scroll to first row of articles, keeping search bar in view
  useEffect(() => {
    var width = window.innerWidth; // get the window's inner width
    var scrollHeight;

    if (width > 1200) {
      scrollHeight = 280;
    } else if (width <= 1200 && width > 1000) {
      scrollHeight = 250;
    } else if (width <= 1000 && width > 800) {
      scrollHeight = 200;
    } else {
      scrollHeight = 160;
    }
    window.scrollTo(0, scrollHeight);
  }, [props.articles.length]);

  // Toggle password visibility
  const togglePassword = (article) => {
    const new_article = props.articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        article.visibility = !article.visibility;
        return article;
      } else {
        return myarticle;
      }
    });
    props.handleArticleList(new_article, "update");
  };

  const resetCopy = () => {
    setIsActive(null);
  };

  function hidePassword(password) {
    return password.split("").map(() => "*");
  }

  // Open clicked on URL after a timeout to allow button animation
  function urlOpen(url) {
    setTimeout(() => {
      window.open(url, "_blank");
    }, 500);
    return;
  }

  return (
    <Container fluid className="container-space">
      <Row
        style={{
          margin: "auto",
          paddingBottom: "25px",
        }}
        className="g-4 justify-content-center justify-content-lg-start"
      >
        {props.spinner && (
          <Col className="d-flex justify-content-center">
            <div id="empty-search">{props.spinner}</div>
          </Col>
        )}
        {props.articles.length < 1 && props.hasSearched ? (
          <Col className="d-flex justify-content-center">
            <div id="empty-search">No results.</div>
          </Col>
        ) : null}
        {props.articles.length < 1 && !props.hasSearched && !props.spinner && (
          <Col className="d-flex justify-content-center">
            <div id="empty-search">Empty...</div>
          </Col>
        )}
        {props.articles &&
          props.articles.map((article) => {
            return (
              <Col
                key={article.id}
                className={
                  props.animateDelete.indexOf(article) !== -1
                    ? "d-flex article-animate-delete"
                    : props.animateInsert.indexOf(article) !== -1
                    ? "d-flex article-animate-insert"
                    : "d-flex"
                }
                xs={"10"}
                sm={"7"}
                md={"5"}
                lg={"4"}
                xl={"3"}
              >
                <Card id="card-whole" color="secondary" body outline>
                  <CardHeader
                    className="card-header-footer"
                    style={{
                      backgroundColor: article.color,
                    }}
                  >
                    <Row>
                      <Col
                        style={{ textAlign: "center" }}
                        sm={"7"}
                        id="article-description"
                        className="d-flex align-items-center justify-content-center justify-content-lg-start"
                      >
                        {article.description}
                      </Col>
                      <Col
                        sm={"5"}
                        className="d-flex align-items-center justify-content-center justify-content-sm-end"
                      >
                        <span
                          onClick={() => {
                            navigator.clipboard.writeText(article.password);
                            setIsActive(article.id);
                          }}
                        >
                          <Tooltip
                            message={
                              article.id === isActive
                                ? "Copied!"
                                : "Copy Password"
                            }
                            delay={article.id === isActive ? 1 : 500}
                            type={"info"}
                            position={"top"}
                            id={"copy"}
                            button={
                              isActive === article.id ? (
                                <FaCopy size={"1.5em"} />
                              ) : (
                                <FaRegCopy size={"1.5em"} />
                              )
                            }
                          />
                        </span>
                        <span onClick={() => togglePassword(article)}>
                          <Tooltip
                            message={"Toggle Password"}
                            type={"info"}
                            position={"top"}
                            id={"toggle"}
                            button={
                              article.visibility ? (
                                <BiHide size={"1.5em"} />
                              ) : (
                                <BiShow size={"1.5em"} />
                              )
                            }
                          />
                        </span>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody id="card-body">
                    <Col>
                      <div style={{ height: "100px" }}>
                        <CardSubtitle className="card-body-titles">
                          Username:
                        </CardSubtitle>{" "}
                        <CardText className="h3 text-center">
                          {article.username}
                        </CardText>
                      </div>
                      <br />
                      <CardSubtitle className="card-body-titles">
                        Password:{" "}
                      </CardSubtitle>
                      <CardText className="h3 text-center">
                        {article.visibility
                          ? article.password
                          : hidePassword(article.password)}
                      </CardText>
                    </Col>
                    <Row
                      style={{ height: "140px" }}
                      className="justify-content-center"
                    >
                      <Col
                        className="d-flex justify-content-center align-items-center"
                        xs={"6"}
                      >
                        {article.url ? (
                          <Button
                            outline
                            color="light"
                            className="login-buttons"
                            onClick={(e) => {
                              urlOpen(article.url, e);
                            }}
                            id="url-link"
                          >
                            {
                              <img
                                src={article.url + "/favicon.ico"}
                                alt=""
                              ></img>
                            }
                          </Button>
                        ) : (
                          <div id="url-link">
                            <ImHappy color={article.color} size={"5em"} />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter
                    className="card-header-footer"
                    style={{ backgroundColor: article.color }}
                  >
                    <Row>
                      <Col
                        sm={"9"}
                        className="d-flex align-items-center justify-content-center justify-content-sm-start"
                      ></Col>
                      <Col
                        sm={"3"}
                        className="d-flex justify-content-center justify-content-sm-end"
                      >
                        <EditArticle
                          outline
                          article={article}
                          handleArticleList={props.handleArticleList}
                          isActive={isActive}
                          resetCopy={resetCopy}
                        />
                        <DeleteArticle
                          article={article}
                          handleArticleList={props.handleArticleList}
                        />
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default ArticleList;
