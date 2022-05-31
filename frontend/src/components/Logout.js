import React from "react";
import { useCookies } from "react-cookie";
import { Button, Container, Row, Col } from "reactstrap";

function Logout() {
  const [token, setToken, removeToken] = useCookies(["mytoken"]);

  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };
  return (
    <div>
      <Button color="primary" onClick={logoutBtn}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
