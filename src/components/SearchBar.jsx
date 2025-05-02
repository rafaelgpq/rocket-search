import React from "react";
import "./SearchBar.css";

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (!/^[a-zA-Z0-9]*$/.test(e.key)) e.preventDefault();
    if (query.length >= 30) e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <input
      text="text"
      value={query}
      className="search-input"
      onChange={(e) => {
        if (e.target.value.length <= 30) setQuery(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder="Search Instagram User..."
    />
  );
};

export default SearchBar;
