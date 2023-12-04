import React, { useState } from 'react';
import sea from '../css/Search.module.css';
import flight from '../assets/image/flight.png'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log('검색어:', searchTerm);
    setSearchTerm('');
  };

  return (
    <div className={sea.search_container}>
      <div className={sea.image_container}>
        <img src={flight} alt="flight" className={sea.background_image} />
      </div>
      <div className={sea.overlay}>
        <div className={sea.vertical_center}>
          <div className={sea.input_button_wrapper}>
            <div className={sea.search_input_wrapper}>
              <div className={sea.search_icon_wrapper}>
                <span role="img" aria-label="search-icon" className={sea.search_icon}>
                  🔍
                </span>
              </div>
              <input
                className={sea.search_input}
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSearch} className={sea.search_button}>
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
