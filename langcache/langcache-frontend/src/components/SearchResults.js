import React from 'react';

const SearchResults = ({ filteredTranslations }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {filteredTranslations.length === 0 ? (
        <p>No search results found.</p>
      ) : (
        <ul>
          {filteredTranslations.map((translation) => (
            <li key={translation.id}>
              {translation.source_phrase.text} → {translation.target_phrase.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SearchResults };
