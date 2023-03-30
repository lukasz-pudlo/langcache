import React, { useState, useEffect, useRef } from 'react';
import AddPhrase from './AddPhrase';

const DisplayTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [showAddPhrase, setShowAddPhrase] = useState(false);

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

  const toggleAddPhrase = () => {
    setShowAddPhrase(!showAddPhrase);
  };

  const buttonText = showAddPhrase ? 'Hide new translation' : 'Add new translation';

  // Ensure all buttons within a certain class are the same width
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    if (buttonContainerRef.current) {
      const buttons = buttonContainerRef.current.querySelectorAll('button');
      let maxWidth = 0;

      // Find the largest button width
      buttons.forEach((button) => {
        const buttonWidth = button.offsetWidth;
        if (buttonWidth > maxWidth) {
          maxWidth = buttonWidth;
        }
      });

      // Set all buttons to the largest width
      buttons.forEach((button) => {
        button.style.width = `${maxWidth}px`;
      });
    }
  }, [translations]);

  return (
    <div>
      {translations.length > 0 ? (
        <div className="translation-display">
          <p>
            {translations[currentTranslationIndex].source_phrase.text} →{' '}
            {translations[currentTranslationIndex].target_phrase.text}
          </p>
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
        <p>No translations found.</p>
      )}
      <br />
      
      <button onClick={toggleAddPhrase}>{buttonText}</button>
      {showAddPhrase && (
        <>
          <h3>New translation</h3>
          <AddPhrase />
        </>
      )}

    </div>
  );
};

export default DisplayTranslations;
