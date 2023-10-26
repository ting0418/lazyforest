// Search.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
// import styles from '../camp/SearchBar.module.scss';

const SearchBar = ({ searchTerm, onSearchTermChange, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="搜尋目的地"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <div>
      </div>
    </div>
  );
};

export default SearchBar;