import React from "react";
import { useCookies } from "react-cookie";
import { Button } from "reactstrap";
import { MdLogout } from "react-icons/md";
import Tooltip from "./Tooltip";

function Logout() {
  const [token, setToken, removeToken] = useCookies(["mytoken"]);

  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };
  return (
    <span>
      {/* <span title="Logout" className="card-icons" onClick={logoutBtn}>
        <Button className="button-outline" outline color="dark">
          <MdLogout color="white" size={"1.5em"} />
        </Button>
      </span> */}

      <Tooltip
        message={"Logout"}
        type={"dark"}
        position={"top"}
        id={"logout"}
        onClickHandler={logoutBtn}
        button={
          <Button className="button-outline" outline color="dark">
            <MdLogout color="white" size={"1.5em"} />
          </Button>
        }
      />
    </span>
  );
}

export default Logout;
