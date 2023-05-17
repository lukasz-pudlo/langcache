import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { AddPhrase } from './AddPhrase';
import { SearchResults } from './SearchResults';

import { ShowAddPhraseContext } from '../ShowAddPhraseProvider';


const DisplayTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editTranslation, setEditTranslation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredTranslations, setFilteredTranslations] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);

  const { showAddPhrase, setShowAddPhrase } = useContext(ShowAddPhraseContext);


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
      setShowTranslation(false);
    }
  }, [currentTranslationIndex]);

  const handleNext = useCallback(() => {
    if (currentTranslationIndex < translations.length - 1) {
      setCurrentTranslationIndex(currentTranslationIndex + 1);
      setShowTranslation(false);
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

  const buttonText = showAddPhrase ? 'Cancel new translation' : 'Add new translation';

  const handlePhraseAdded = () => {
    setCurrentTranslationIndex(translations.length);
    fetchTranslations();
  };

  const handleEditTranslation = async (translation) => {
    setEditTranslation(translation);
    setIsEditing(true);
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
      setIsEditing(false);
      fetchTranslations();
    } else {
      console.error('Error: Could not edit translation.');
    }
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
    <div class="container-fluid">
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

                <div className="row">
                  <div class="col-sm-8"></div>
                  <div class="col-sm-4">

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      {!isEditing && (
                        <>
                          <button
                            type="button"
                            className="btn btn-secondary me-md-2"
                            onClick={() => handleEditTranslation(translations[currentTranslationIndex])}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveTranslation(translations[currentTranslationIndex].id)}
                          >
                            Remove
                          </button>
                        </>
                      )}

                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div class="col-sm centered-text">
                    <div className="card-body">
                      {isEditing ? (
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
                          <button type="submit" className='btn btn-primary'>Save</button>
                          <button className="btn btn-danger" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                      ) : (
                        <>
                          <h2>
                            {translations[currentTranslationIndex].source_phrase.text}
                          </h2>
                          <div class="col-sm centered-text">
                            {showTranslation ? (
                              <div className='card-body'>
                                <h2>
                                  {translations[currentTranslationIndex].target_phrase.text}
                                </h2>
                              </div>
                            ) : (
                              <div className="card-body">
                                <button className="btn btn-outline-secondary" onClick={() => setShowTranslation(true)}>Show translation</button>
                              </div>
                            )}
                          </div>
                          <div class="col-sm"></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>


                {!isEditing && (
                  <div className="row mt-3">

                    <div class="col-sm"></div>

                    <div className="col-sm">
                      <button className="btn btn-primary w-100" onClick={handlePrev} disabled={currentTranslationIndex === 0}>
                        Previous
                      </button>
                    </div>
                    <div className="col-sm">
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleNext}
                        disabled={currentTranslationIndex === translations.length - 1}
                      >
                        Next
                      </button>
                    </div>
                    <div class="col-sm"></div>
                    <div class="col-sm"></div>
                    <div class="col-sm"></div>

                    {!showAddPhrase && (
                      <div className="col-sm">
                        <button type="button" class="btn btn-primary" onClick={toggleAddPhrase}>{buttonText}</button>
                      </div>
                    )}


                  </div>
                )}


              </div >

            ) : (
              <p>No translations available</p>
            )
          )}

        </>

      )
      }
    </div>
  );

};

export default DisplayTranslations;
