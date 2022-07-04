import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Button,
  FormFeedback,
  Input,
  Container,
  Col,
  Row,
  FormText,
} from "reactstrap";
import { FcLock, FcUnlock } from "react-icons/fc";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({
    username: false,
    password: false,
    passwordConfirm: false,
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (token["mytoken"]) {
      navigate("/vault");
    }
  }, [token]);

  //   When user switches between register/ login forms, reset any errors
  useEffect(() => {
    setError("");
    setFormError({ username: false, password: false, passwordConfirm: false });
  }, [isLogin]);

  const handleUsername = (username) => {
    setUsername(username);
    setFormError({ ...formError, username: false });
    setError("");
  };

  const handlePassword = (password) => {
    setPassword(password);
    setFormError({ ...formError, password: false });
    setError("");
  };

  const handlePasswordConfirm = (passwordConfirm) => {
    setPasswordConfirm(passwordConfirm);
    setFormError({ ...formError, passwordConfirm: false });
    setError("");
  };

  const loginBtn = (e) => {
    {
      // In case of being sent from register button, prevent default already called in register function
      e && e.preventDefault();
    }
    if (username && password) {
      setFormError({ username: false, password: false });
      APIService.LoginUser({ username, password })
        .then((resp) => {
          setLoginSuccess(true);
          setTimeout(() => {
            setToken("mytoken", resp.token);
          }, 800);
        })
        .catch((error) => {
          setError(error);
          document.querySelector("#username").select();
        });
    } else {
      setError("");
      setFormError({
        username: !username,
        password: !password,
      });
      {
        username
          ? document.querySelector("#password").select()
          : document.querySelector("#username").select();
      }
    }
  };

  const registerBtn = (e) => {
    e.preventDefault();
    if (username && password && password === passwordConfirm) {
      setFormError({
        username: false,
        password: false,
        passwordConfirm: false,
      });
      APIService.RegisterUser({ username, password })
        .then(() => loginBtn())
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    } else {
      if (password && passwordConfirm && password != passwordConfirm) {
        setError({ message: "Passwords do not match" });
        setFormError({ ...formError, password: true, passwordConfirm: true });
      } else {
        setError("");
        setFormError({
          username: !username,
          password: !password,
          passwordConfirm: !passwordConfirm,
        });
      }

      {
        username
          ? document.querySelector("#password").select()
          : document.querySelector("#username").select();
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Row className="flex-grow-1 justify-content-center align-items-center">
        <Col xl={"5"} lg={"6"} md={"8"} xs={"10"}>
          <Form
            onSubmit={
              isLogin
                ? (e) => {
                    loginBtn(e);
                  }
                : (e) => {
                    registerBtn(e);
                  }
            }
          >
            <FormGroup row>
              <Col
                style={{ fontSize: "12vw" }}
                className="d-flex justify-content-center app-title"
              >
                {isLogin ? "login." : "register."}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label htmlFor="username">Username</Label>
                <Input
                  autoFocus={true}
                  type="text"
                  id="username"
                  placeholder="Please Enter Username"
                  onChange={(e) => handleUsername(e.target.value)}
                  value={username}
                  invalid={formError.username}
                />
                {formError.username && (
                  <FormFeedback>Please provide a username</FormFeedback>
                )}
              </Col>
            </FormGroup>

            <FormGroup className="position-relative" row>
              <Col>
                <Label htmlFor="password" className="form-label">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Please Enter Password"
                  onChange={(e) => handlePassword(e.target.value)}
                  value={password}
                  invalid={formError.password}
                />
                {formError.password && (
                  <FormFeedback>Please provide a password</FormFeedback>
                )}
              </Col>
            </FormGroup>
            {!isLogin && (
              <FormGroup className="position-relative" row>
                <Col>
                  <Label htmlFor="passwordConfirm" className="form-label">
                    Confirm Password
                  </Label>
                  <Input
                    type="password"
                    id="passwordConfirm"
                    placeholder="Please Confirm Password"
                    onChange={(e) => handlePasswordConfirm(e.target.value)}
                    value={passwordConfirm}
                    invalid={formError.passwordConfirm}
                  />
                  {formError.passwordConfirm && (
                    <FormFeedback>Please confirm password.</FormFeedback>
                  )}
                </Col>
              </FormGroup>
            )}
            {error ? (
              <Row className="g-2">
                <Col className="d-flex justify-content-center">
                  <FormText style={{ fontWeight: "bold" }}>
                    {error.message}
                  </FormText>
                </Col>
              </Row>
            ) : null}
            <FormGroup row>
              <Col className="d-flex justify-content-center">
                {isLogin ? (
                  <Button
                    type="submit"
                    className="login-buttons"
                    outline
                    color="light"
                  >
                    {loginSuccess ? (
                      <FcLock size={"12vw"} />
                    ) : (
                      <FcUnlock size={"10vw"} />
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="login-buttons"
                    color="primary"
                  >
                    Register
                  </Button>
                )}
              </Col>
            </FormGroup>
            <Row>
              <Col className="d-flex justify-content-center">
                {isLogin ? (
                  <p>
                    No account?{" "}
                    <span className="fake-link" onClick={() => setLogin(false)}>
                      Register{" "}
                    </span>
                    Here
                  </p>
                ) : (
                  <p>
                    If You Have An Account, Please{" "}
                    <span className="fake-link" onClick={() => setLogin(true)}>
                      Login{" "}
                    </span>
                    Here
                  </p>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
