import React, { useState } from 'react';
import sea from '../css/Search.module.css';
import flight from '../assets/image/flight.png'
import searchs from '../assets/image/search.png'

const Search = (props) => {

  const {searchTerm,onSearch} = props;

  return (
    <div className={sea.search_container} style={{backgroundImage:`url(${flight})`}}>
          <img src={searchs} className={sea.search}/>
        <input
          className={sea.search_input}
          type="search"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => onSearch(e)}
        />
    </div>
  );
};

export default Search;
