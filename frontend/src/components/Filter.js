import React from "react";
import { Input, InputGroup } from "reactstrap";
function Filter(props) {
  const handleSearchFilter = (selector) => {
    props.handleSearchFilter(selector);
  };

  return (
    <div>
      <div onChange={(e) => handleSearchFilter(e.target.value)}>
        <Input
          defaultChecked="checked"
          type="radio"
          value="username"
          name="search-query"
        />{" "}
        Username
        <Input type="radio" value="description" name="search-query" />
        Description
        <Input type="radio" value="url" name="search-query" /> URL
      </div>
    </div>
  );
}

export default Filter;
