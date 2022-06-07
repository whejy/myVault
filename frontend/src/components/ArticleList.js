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

  return (
    <Container fluid className="container-space">
      <Row
        style={{
          margin: "auto",
          paddingBottom: "25px",
        }}
        className="g-4 justify-content-center justify-content-lg-start"
      >
        {props.articles.length < 1 && (
          <Col className="d-flex justify-content-center">
            <div id="empty-search">Sorry, no results.</div>
          </Col>
        )}
        {props.articles &&
          props.articles.map((article) => {
            return (
              <Col
                key={article.id}
                className="d-flex"
                xs={"10"}
                sm={"6"}
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
                        sm={"9"}
                        className="d-flex align-items-center justify-content-center justify-content-sm-start"
                      >
                        {article.description && <i>{article.description}</i>}
                      </Col>
                      <Col
                        sm={"3"}
                        className="d-flex justify-content-center justify-content-sm-end"
                      >
                        <span
                          title="Copy Password"
                          className="card-icons"
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
                          title="Show/ Hide Password"
                          className="card-icons"
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
                    <Col xs={"6"}>
                      <span className="card-body-titles">Username:</span>{" "}
                      <h3>{article.username}</h3>
                      <br />
                      <span className="card-body-titles">Password: </span>
                      <h3>
                        {article.visibility
                          ? article.password
                          : hidePassword(article.password)}
                      </h3>
                    </Col>
                    <Col
                      xs={"6"}
                      className="d-flex justify-content-center align-items-center"
                    >
                      {article.url ? (
                        <a href={article.url} target="_blank" rel="noreferrer">
                          <div id="url-link">
                            <img
                              src={article.url + "/favicon.ico"}
                              alt=""
                            ></img>
                          </div>
                        </a>
                      ) : (
                        <ImHappy color={article.color} size={"5em"} />
                      )}
                    </Col>
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
