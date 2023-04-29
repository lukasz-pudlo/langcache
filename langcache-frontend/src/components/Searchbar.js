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
    
      <div className="input-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
          id="search-term"
          maxLength="510"
          placeholder="Search for translations..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
    
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          Search
        </button>
        
      </div>
    


  );
};

export { Searchbar };
