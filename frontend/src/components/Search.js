import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Input, Row } from "reactstrap";

function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("username");
  let initialRender = useRef(true);

  // Update Search results as user modifies query. Ignore on initial page render.
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      search();
    }
  }, [searchFilter, searchQuery, props.articles]);

  //   Store user's search input
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  //   Store user's chosen filter
  const handleSearchFilter = (selector) => {
    setSearchFilter(selector);
  };

  //   Send user's full search query to parent
  const search = () => {
    props.handleSearchResults(searchQuery, searchFilter);
  };

  //
  const reset = () => {
    handleSearchQuery("");
    handleSearchFilter("username");
  };

  return (
    <div>
      <Row>
        <Col xxs={4} id="search-container">
          <Input
            id="search-input"
            placeholder="Search"
            onChange={(e) => handleSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button
            aria-label="Close"
            id="search-reset"
            className="btn-close"
            onClick={() => reset()}
          ></Button>
        </Col>
      </Row>
      <label>
        <Input
          checked={searchFilter === "username"}
          onChange={(e) => handleSearchFilter(e.target.value)}
          type="radio"
          value="username"
          name="search-query"
        />{" "}
        Username
      </label>
      <br />
      <label>
        <Input
          checked={searchFilter === "description"}
          onChange={(e) => handleSearchFilter(e.target.value)}
          type="radio"
          value="description"
          name="search-query"
        />{" "}
        Description
      </label>
      <br />
      <label>
        <Input
          checked={searchFilter === "url"}
          onChange={(e) => handleSearchFilter(e.target.value)}
          type="radio"
          value="url"
          name="search-query"
        />{" "}
        URL
      </label>
    </div>
  );
}

export default Search;
