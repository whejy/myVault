import React from "react";
import { useCookies } from "react-cookie";
import { Button } from "reactstrap";
import { MdLogout } from "react-icons/md";

function Logout() {
  const [token, setToken, removeToken] = useCookies(["mytoken"]);

  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };
  return (
    <span>
      <span title="Logout" className="card-icons" onClick={logoutBtn}>
        <Button className="button-outline" outline color="dark">
          <MdLogout color="white" size={"1.5em"} />
        </Button>
      </span>
    </span>
  );
}

export default Logout;
