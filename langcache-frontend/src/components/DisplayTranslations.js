import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AddPhrase } from './AddPhrase';
import { Searchbar } from './Searchbar';
import { SearchResults } from './SearchResults';


const DisplayTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [showAddPhrase, setShowAddPhrase] = useState(false);
  const [loading, setLoading] = useState(true);
  const buttonContainerRef = useRef(null);
  const [editTranslation, setEditTranslation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filteredTranslations, setFilteredTranslations] = useState([]);

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
  

  const handlePrev = useCallback(() => {
    if (currentTranslationIndex > 0) {
      setCurrentTranslationIndex(currentTranslationIndex - 1);
    }
  }, [currentTranslationIndex]);
  
  const handleNext = useCallback(() => {
    if (currentTranslationIndex < translations.length - 1) {
      setCurrentTranslationIndex(currentTranslationIndex + 1);
    }
  }, [currentTranslationIndex, translations.length]);

  const handleArrowKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };
  
  useEffect(() => {
    const handleArrowKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
  
    document.addEventListener('keydown', handleArrowKeyPress);
  
    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('keydown', handleArrowKeyPress);
    };
  }, [handlePrev, handleNext]);
  

  const toggleAddPhrase = () => {
    setShowAddPhrase(!showAddPhrase);
  };

  const buttonText = showAddPhrase ? 'Hide new translation' : 'Add new translation';

  const handlePhraseAdded = () => {
    setCurrentTranslationIndex(translations.length);
    fetchTranslations();
  };

  const handleEditTranslation = async (translation) => {
    setEditTranslation(translation);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e, field) => {
    const newTranslation = { ...editTranslation };
    if (field === 'source_phrase') {
      newTranslation.source_phrase.text = e.target.value;
    } else if (field === 'target_phrase') {
      newTranslation.target_phrase.text = e.target.value;
    }
    setEditTranslation(newTranslation);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/translations/${editTranslation.id}/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTranslation),
      }
    );

    if (response.ok) {
      setShowEditModal(false);
      fetchTranslations();
    } else {
      console.error('Error: Could not edit translation.');
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
  };
  

  const handleRemoveTranslation = async (translationId) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/translations/${translationId}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      if (currentTranslationIndex === translations.length - 1) {
        setCurrentTranslationIndex(currentTranslationIndex - 1);
      }
      fetchTranslations();
    } else {
      console.error('Error: Could not remove translation.');
    }

  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = translations.filter((translation) => {
        return (
          translation.source_phrase.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          translation.target_phrase.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredTranslations(filtered);
    } else {
      setFilteredTranslations(translations);
    }
  };


  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      <div className="toggle-button-container">
        <button onClick={toggleAddPhrase}>{buttonText}</button>

      </div>
      <div className="add-phrase-container">
        {showAddPhrase && <AddPhrase onPhraseAdded={handlePhraseAdded} />}
      </div>
      {loading ? (
        <p>Loading translations...</p>
      ) : (
        <>
          {filteredTranslations.length > 0 ? (
            // Display search results
            <SearchResults filteredTranslations={filteredTranslations} />
          ) : (
            // Display all translations
            translations.length > 0 ? (
              <div className="display-translation-wrapper">
                <div className="translations-container">
                  <div div className="translation-buttons">
                    <button onClick={() => handleEditTranslation(translations[currentTranslationIndex])}>
                      Edit
                    </button>
                    <button onClick={() => handleRemoveTranslation(translations[currentTranslationIndex].id)}>
                      Remove
                    </button>
                
                  </div>
                  <h2 className="centered-text">
                    {translations[currentTranslationIndex].source_phrase.text} →{' '}
                    {translations[currentTranslationIndex].target_phrase.text}
                  </h2>
                </div>
                <div className="buttons-container">
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
              </div>
            ) : (
              <p>No translations available</p>
            )
          )}
        </>
      )}
      {showEditModal && (
        <div className="edit-modal">
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>
                Source Phrase:
              </label>
              <input
                type="text"
                value={editTranslation.source_phrase.text}
                onChange={(e) => handleEditInputChange(e, 'source_phrase')}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>
                Target Phrase:
              </label>
              <input
                type="text"
                value={editTranslation.target_phrase.text}
                onChange={(e) => handleEditInputChange(e, 'target_phrase')}
                className="form-control"
              />
            </div>
            <button type="submit" className='btn btn-lg btn-primary'>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
  
};

export default DisplayTranslations;
