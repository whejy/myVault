import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Container,
} from "reactstrap";
import FormModalFeedback from "./FormFeedback";

function FormModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [urlChecked, setUrlChecked] = useState(false);
  const [token] = useCookies(["mytoken"]);
  const [formError, setFormError] = useState({
    username: false,
    password: false,
    description: false,
    url: false,
  });

  useEffect(() => {
    setUsername(props.article.username);
    setPassword(props.article.password);
    setDescription(props.article.description);
    setUrl(props.article.url);
    setFormError({
      username: false,
      password: false,
      description: false,
      url: false,
    });
  }, [props.article]);

  useEffect(() => {
    setFormError({ ...formError, username: false });
  }, [username]);

  useEffect(() => {
    setFormError({ ...formError, password: false });
  }, [password]);

  useEffect(() => {
    setFormError({ ...formError, description: false });
  }, [description]);

  useEffect(() => {
    setFormError({ ...formError, url: false });
    setUrlChecked(false);
  }, [url]);

  const checkUrl = (e, action) => {
    e.preventDefault();
    APIService.ValidateUrl(url).then((resp) => {
      if (resp) {
        // Ensure app doesn't check same submitted url more than once. Faster performance
        setUrlChecked(true);
        if (action === "insert") {
          insertArticle();
        } else {
          updateArticle();
        }
      } else {
        setFormError({
          username: !username,
          password: !password,
          description: !description,
          url: true,
        });
      }
    });
  };

  const updateArticle = (e = null) => {
    {
      e && e.preventDefault();
    }
    if (username && password && description) {
      // Reset "copied" password if user updates stored password
      if (
        props.isActive == props.article.id &&
        props.article.password != password
      ) {
        props.resetCopy();
      }
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
      setFormError({
        username: !username,
        password: !password,
        description: !description,
      });
    }
  };

  const insertArticle = (e = null) => {
    {
      e && e.preventDefault();
    }
    if (username && password && description) {
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
      setFormError({
        username: !username,
        password: !password,
        description: !description,
      });
    }
  };

  return (
    <div>
      <Modal autoFocus={false} isOpen={true} toggle={props.handleModal}>
        <ModalHeader toggle={props.handleModal}>{props.title}</ModalHeader>
        <Form
          onSubmit={
            props.article.id
              ? (e) => {
                  url && !urlChecked ? checkUrl(e, "update") : updateArticle(e);
                }
              : (e) => {
                  url && !urlChecked ? checkUrl(e, "insert") : insertArticle(e);
                }
          }
        >
          <ModalBody>
            {props.article ? (
              <Container>
                <FormGroup>
                  <Label htmlFor="description">Title</Label>
                  <Input
                    autoFocus={true}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Please enter a title"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    invalid={formError.description}
                  />
                  {formError.description && <FormModalFeedback />}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username" className="form-label">
                    Username
                  </Label>
                  <Input
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Please enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    invalid={formError.username}
                  />
                  {formError.username && <FormModalFeedback />}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" className="form-label">
                    Password
                  </Label>
                  <Input
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Please enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    invalid={formError.password}
                  />
                  {formError.password && <FormModalFeedback />}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="url" className="form-label">
                    Optional: URL
                  </Label>
                  <Input
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    type="text"
                    className="form-control"
                    id="url"
                    placeholder="https://"
                    value={url}
                    invalid={formError.url}
                    onChange={(e) => {
                      // Prefix "https://" to user URL input form
                      const prefix = "https://";
                      const input = e.target.value;
                      input.length > 0
                        ? (e.target.value =
                            prefix + input.substring(prefix.length))
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
                  {formError.url && <FormModalFeedback urlError={true} />}
                </FormGroup>{" "}
              </Container>
            ) : null}
          </ModalBody>
          <ModalFooter>
            {props.article.id ? (
              <Button type="Submit" color="success">
                Save
              </Button>
            ) : (
              <Button type="submit" color="success">
                Add
              </Button>
            )}
            <Button onClick={props.handleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default FormModal;
