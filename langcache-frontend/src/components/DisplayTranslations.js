import React, { useState, useEffect, useRef } from 'react';
import AddPhrase from './AddPhrase';


const DisplayTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [showAddPhrase, setShowAddPhrase] = useState(false);
  const [loading, setLoading] = useState(true);
  const buttonContainerRef = useRef(null);

  const fetchTranslations = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/translations/`);
    if (response.ok) {
      const data = await response.json();
      setTranslations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
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

  const toggleAddPhrase = () => {
    setShowAddPhrase(!showAddPhrase);
  };

  const buttonText = showAddPhrase ? 'Hide new translation' : 'Add new translation';

  const handlePhraseAdded = () => {
    setCurrentTranslationIndex(translations.length);
    fetchTranslations();
  };

  return (
    <div>
      <button onClick={toggleAddPhrase}>{buttonText}</button>
      {showAddPhrase && <AddPhrase onPhraseAdded={handlePhraseAdded} />}
      {loading ? (
        <p>Loading translations...</p>
      ) : translations.length > 0 ? (
        <div>
          <h2>
            {translations[currentTranslationIndex].source_phrase.text} →{' '}
            {translations[currentTranslationIndex].target_phrase.text}
          </h2>
          <div className="translation-buttons" ref={buttonContainerRef}>
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
        <p>No translations available</p>
      )}
    </div>
  );
  
  
  
};

export default DisplayTranslations;
