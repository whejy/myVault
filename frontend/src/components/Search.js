import React, { useEffect, useState, useRef } from "react";
import { Input } from "reactstrap";
import Filter from "./Filter";

function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("username");
  let initialRender = useRef(true);

  // Update Search results as user modifies query. Ignore on initial page render.
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      Search();
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
  const Search = () => {
    props.handleSearchResults(searchQuery, searchFilter);
  };

  return (
    <div>
      <div>
        <Input
          placeholder="Search"
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
      </div>
      <Filter handleSearchFilter={handleSearchFilter} />
    </div>
  );
}

export default Search;
