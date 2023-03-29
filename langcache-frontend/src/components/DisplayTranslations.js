import React, { useState, useEffect } from 'react';

const DisplayTranslations = () => {
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    const fetchTranslations = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/translations/`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
      }
    };

    fetchTranslations();
  }, []);
  
  return (
    <div>
      <h2>Translations</h2>
      <ul>
        
        {translations.map((translation) => (
          <li key={translation.id}>
            {translation.source_phrase.text} → {translation.target_phrase.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTranslations;
