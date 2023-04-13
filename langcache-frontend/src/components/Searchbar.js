import React, { useState } from 'react';

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="searchbar-wrapper">
        <form onSubmit={handleSubmit}>
            <div className="searchbar-grid">
            <div className="form-group">
                <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
                id="search-term"
                maxLength="510"
                placeholder="Search for translations..."
                />
            </div>
                <div className="search-button-container">
                    <button type="submit">Search</button>
                </div>
            </div>
        </form>
    </div>
  );
};

export { Searchbar };
