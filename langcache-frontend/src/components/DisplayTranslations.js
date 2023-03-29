import React, { useState, useEffect } from 'react';

const DisplayTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);

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

  const handlePrev = () => {
    if (currentTranslationIndex > 0) {
      setCurrentTranslationIndex(currentTranslationIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTranslationIndex < translations.length - 1) {
      setCurrentTranslationIndex(currentTranslationIndex + 1);
    }
  };

  return (
    <div>
      <h2>Translations</h2>
      {translations.length > 0 ? (
        <div>
          <p>
            {translations[currentTranslationIndex].source_phrase.text} →{' '}
            {translations[currentTranslationIndex].target_phrase.text}
          </p>
          <button onClick={handlePrev} disabled={currentTranslationIndex === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentTranslationIndex === translations.length - 1}
          >
            Next
          </button>
        </div>
      ) : (
        <p>No translations found.</p>
      )}
    </div>
  );
};

export default DisplayTranslations;
