// SearchBar.js

import React, { useState } from 'react';
import './SearchBar.css'; // Import your CSS file

const SearchBar = ({ suggestions, onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const renderSuggestions = () => {
    if (!showSuggestions) {
      return null;
    }

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <ul className="suggestions-list">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
            <br></br>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
      {renderSuggestions()}
    </div>
  );
};

export default SearchBar;
