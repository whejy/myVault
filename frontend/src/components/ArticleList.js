import React, { useState } from "react";
import EditArticle from "./EditArticle";
import DeleteArticle from "./DeleteArticle";
import {
  Button,
  Container,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
  CardHeader,
} from "reactstrap";
import { FaCopy, FaRegCopy } from "react-icons/fa";
import { BiHide, BiShow } from "react-icons/bi";
import { ImHappy } from "react-icons/im";
import randomColor from "randomcolor";

function ArticleList(props) {
  const [isActive, setIsActive] = useState(null);

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

  function hidePassword(password) {
    return password.split("").map(() => "*");
  }

  // function calculate(articles) {
  //   var test = [];
  //   for (let i = 0; i < articles.length; i += 2) {
  //     const chunk = articles.slice(i, i + 2);
  //     test.push(chunk);
  //   }
  //   return test
  //   return Math.ceil(articles.length / 2);
  // }

  return (
    <div>
      {props.articles.length < 1 && (
        <span id="empty-search">Sorry, we couldn't find any results.</span>
      )}
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.id}>
              <Container className="justify-content-center">
                <Row className="justify-content-center">
                  <Col
                    xs={"10"}
                    sm={"9"}
                    md={"8"}
                    lg={"6"}
                    xl={"5"}
                    xxl={"4.5"}
                  >
                    <Card id="card-whole" body color="secondary" outline>
                      <CardHeader
                        className="card-header-footer"
                        style={{
                          backgroundColor: article.color,
                        }}
                      >
                        <Row>
                          <Col
                            sm={"9"}
                            className="d-flex align-items-center justify-content-center justify-content-sm-start"
                          >
                            {article.description && (
                              <i>{article.description}</i>
                            )}
                          </Col>
                          <Col
                            sm={"3"}
                            className="d-flex justify-content-center justify-content-sm-end"
                          >
                            <span
                              title="Copy Password"
                              className="copy-hide-buttons"
                              id="copy-button"
                              onClick={() => {
                                navigator.clipboard.writeText(article.password);
                                setIsActive(article.id);
                              }}
                            >
                              {isActive == article.id ? (
                                <FaCopy size={"1.5em"} />
                              ) : (
                                <FaRegCopy size={"1.5em"} />
                              )}
                            </span>
                            <span
                              id="hidepassword-button"
                              className="copy-hide-buttons"
                              onClick={() => togglePassword(article)}
                              color="primary"
                            >
                              {article.visibility ? (
                                <BiHide size={"1.5em"} />
                              ) : (
                                <BiShow size={"1.5em"} />
                              )}
                            </span>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody
                        id="card-body"
                        className="d-flex justify-content-center"
                      >
                        <Col xs={"6"} tag={"h2"}>
                          Username: {article.username}
                          <br />
                          <br />
                          Password:{" "}
                          {article.visibility
                            ? article.password
                            : hidePassword(article.password)}
                        </Col>
                        <Col
                          xs={"6"}
                          className="d-flex justify-content-center align-items-center"
                        >
                          {article.url ? (
                            <p>
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={article.url + "/favicon.ico"}
                                  alt=""
                                ></img>
                              </a>
                            </p>
                          ) : (
                            <ImHappy color={article.color} size={"5em"} />
                          )}
                        </Col>
                      </CardBody>
                      <CardFooter
                        className="card-header-footer"
                        style={{ backgroundColor: article.color }}
                      >
                        <Container className="d-flex  justify-content-center justify-content-md-end">
                          <Row>
                            <Col>
                              <EditArticle
                                article={article}
                                handleArticleList={props.handleArticleList}
                              />
                            </Col>
                            <Col>
                              <DeleteArticle
                                article={article}
                                handleArticleList={props.handleArticleList}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
              </Container>

              <hr className="hrclass" />
            </div>
          );
        })}
    </div>
  );
}

export default ArticleList;
