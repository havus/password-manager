import React from 'react';
import './style.css';

const Search = props => {
  const { setSearch } = props;

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();
  };

  return (
    <div id="search-box">
      <form onSubmit={submitHandler}>
        <input type="text" label="search" placeholder="Search" onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;