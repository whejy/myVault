import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Button,
  FormText,
  Input,
  Container,
  Col,
  Row,
} from "reactstrap";
import { FcLock, FcUnlock } from "react-icons/fc";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({
    username: false,
    password: false,
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
    setFormError({ username: false, password: false });
  }, [isLogin]);

  const loginBtn = (e) => {
    if (username && password) {
      setFormError({ username: false, password: false });
      APIService.LoginUser({ username, password })
        .then((resp) => {
          setLoginSuccess(true);
          setTimeout(() => {
            setToken("mytoken", resp.token);
          }, 800);
        })
        .catch((error) => setError(error));
    } else {
      setError("");
      setFormError({ username: !username, password: !password });
    }
  };

  const registerBtn = () => {
    if (username && password) {
      setFormError({ username: false, password: false });
      APIService.RegisterUser({ username, password })
        .then(() => loginBtn())
        .catch((error) => setError(error));
    } else {
      setError("");
      setFormError({ username: !username, password: !password });
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Row className="flex-grow-1 justify-content-center align-items-center">
        <Col md={"6"}>
          <Form>
            <FormGroup row>
              <Col style={{ fontSize: "10vw" }} className="app-title">
                {isLogin ? "login." : "register."}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Please Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                {formError.username && (
                  <Alert color="danger">Please Provide a Username</Alert>
                )}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <Label htmlFor="password" className="form-label">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Please Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {formError.password && (
                  <Alert color="danger">Please Provide a Password</Alert>
                )}
              </Col>
            </FormGroup>
            <Row>
              <Col className="d-flex justify-content-center">
                {error ? <div>{error.message}</div> : null}
                {isLogin ? (
                  <Button
                    className="login-buttons"
                    outline
                    color="light"
                    onClick={loginBtn}
                  >
                    {/* <FcLock className="z-index-1" size={"25em"} /> */}
                    {loginSuccess ? (
                      <FcLock size={"12em"} />
                    ) : (
                      <FcUnlock size={"10em"} />
                    )}
                  </Button>
                ) : (
                  <Button color="primary" onClick={registerBtn}>
                    Register
                  </Button>
                )}
              </Col>
            </Row>
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
          {/* <FcUnlock /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
