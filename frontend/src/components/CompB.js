import React, { useContext } from "react";
import { MyContext } from "../App";

function CompB() {
  // const data = useContext(MyContext);

  return (
    <div>
      {/* <MyContext.Consumer>
        {(data) => {
          return <h2>{data}</h2>;
        }}
      </MyContext.Consumer> */}

      {/* <h1>{data}</h1> */}
    </div>
  );
}

export default CompB;
