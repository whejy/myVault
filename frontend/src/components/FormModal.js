import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Container,
} from "reactstrap";

function FormModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [token] = useCookies(["mytoken"]);
  const [formError, setFormError] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    setUsername(props.article.username);
    setPassword(props.article.password);
    setDescription(props.article.description);
    setUrl(props.article.url);
    setFormError({ username: false, password: false });
  }, [props.article]);

  const updateArticle = () => {
    if (username && password) {
      props.handleModal();
      APIService.UpdateArticle(
        props.article.id,
        {
          username,
          password,
          description,
          url,
        },
        token["mytoken"]
      ).then((resp) => props.handleArticleList(resp, "update"));
    } else {
      setFormError({ username: !username, password: !password });
    }
  };

  const insertArticle = () => {
    if (username && password) {
      props.handleModal();
      APIService.InsertArticle(
        { username, password, description, url },
        token["mytoken"]
      ).then((resp) => props.handleArticleList(resp, "insert"));
      setUsername("");
      setPassword("");
      setUrl("");
      setDescription("");
    } else {
      setFormError({ username: !username, password: !password });
    }
  };

  return (
    <div>
      <Modal isOpen={true} toggle={props.handleModal}>
        <ModalHeader toggle={props.handleModal}>{props.title}</ModalHeader>
        <ModalBody>
          {props.article ? (
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Please enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {formError.username && <div>Please Provide a Username</div>}

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Please enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formError.password && <div>Please Provide a Password</div>}

              <label htmlFor="description" className="form-label">
                Optional: Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Please enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="url" className="form-label">
                Optional: URL
              </label>
              <input
                type="url"
                className="form-control"
                id="url"
                placeholder="https://"
                value={url}
                onChange={(e) => {
                  // Prefix "https://" to user URL input form
                  const prefix = "https://";
                  const input = e.target.value;
                  input.length > 0
                    ? (e.target.value = prefix + input.substring(prefix.length))
                    : (e.target.value = "");

                  // Allow user to empty the URL field
                  if (input.length === 7 && !e.nativeEvent.data) {
                    e.target.value = "";
                  }

                  // Fix to capture user's initial keypress in URL field
                  if (input.length === 1 && e.nativeEvent.data) {
                    e.target.value = prefix + e.nativeEvent.data;
                  }

                  setUrl(e.target.value);
                }}
              />
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          {props.article.id ? (
            <Button
              className="d-flex justify-content-center"
              onClick={updateArticle}
              color="success"
            >
              Save
            </Button>
          ) : (
            <Button onClick={insertArticle} color="success">
              Add
            </Button>
          )}
          <Button onClick={props.handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FormModal;
