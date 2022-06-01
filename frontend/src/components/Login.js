import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Alert, Input, Col, Row } from "reactstrap";

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

  const loginBtn = () => {
    if (username && password) {
      setFormError({ username: false, password: false });
      APIService.LoginUser({ username, password })
        .then((resp) => setToken("mytoken", resp.token))
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
    <div className="App">
      <br />
      <br />
      {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
      <br />
      <br />

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <Input
          type="text"
          className="form-control"
          id="username"
          placeholder="Please Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {formError.username && (
          <Alert color="danger">Please Provide a Username</Alert>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <Input
          type="password"
          className="form-control"
          id="password"
          placeholder="Please Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {formError.password && (
          <Alert color="danger">Please Provide a Password</Alert>
        )}
      </div>

      {error ? <div>{error.message}</div> : null}
      {isLogin ? (
        <button onClick={loginBtn} className="btn btn-primary">
          Login
        </button>
      ) : (
        <button onClick={registerBtn} className="btn btn-primary">
          Register
        </button>
      )}

      <div className="mb-3">
        <br />
        {isLogin ? (
          <h5>
            If You Don't Have An Account, Please{" "}
            <span className="fake-link" onClick={() => setLogin(false)}>
              Register{" "}
            </span>
            Here
          </h5>
        ) : (
          <h5>
            If You Have An Account, Please{" "}
            <span className="fake-link" onClick={() => setLogin(true)}>
              Login{" "}
            </span>
            Here
          </h5>
        )}
      </div>
    </div>
  );
}

export default Login;
