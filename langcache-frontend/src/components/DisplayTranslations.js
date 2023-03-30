import React, { useState, useEffect } from 'react';
import AddPhrase from './AddPhrase';

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
      {translations.length > 0 ? (
        <div className="translation-display">
          <p>
            {translations[currentTranslationIndex].source_phrase.text} →{' '}
            {translations[currentTranslationIndex].target_phrase.text}
          </p>
          <div className="translation-buttons">
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
        </div>
      ) : (
        <p>No translations found.</p>
      )}
      <h3>Add a new translation</h3>
      <AddPhrase />
    </div>
  );
};

export default DisplayTranslations;
