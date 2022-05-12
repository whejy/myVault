import React, { useState } from "react";

function TogglePassword() {
  const [passwordType, setPasswordType] = useState("password");

  const Toggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return <div>TogglePassword</div>;
}

export default TogglePassword;
