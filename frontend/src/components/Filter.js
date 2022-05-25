import React from "react";

function Filter(props) {
  const handleSearchFilter = (selector) => {
    props.handleSearchFilter(selector);
  };

  return (
    <div>
      <div onChange={(e) => handleSearchFilter(e.target.value)}>
        <input
          defaultChecked="checked"
          type="radio"
          value="username"
          name="search-query"
        />{" "}
        Username
        <input type="radio" value="description" name="search-query" />
        Description
        <input type="radio" value="url" name="search-query" /> URL
      </div>
    </div>
  );
}

export default Filter;
