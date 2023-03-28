import React, { useEffect, useState } from 'react';

const LanguageList = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch('/api/languages/')
      .then((response) => response.json())
      .then((data) => setLanguages(data));
  }, []);

  return (
    <div>
      <h1>Languages</h1>
      <ul>
        {languages.map((language) => (
          <li key={language.id}>{language.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;
