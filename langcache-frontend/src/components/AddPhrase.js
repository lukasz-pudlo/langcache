import React, { useState, useEffect } from 'react';


const AddPhrase = ({ onPhraseAdded }) => {
  const [sourcePhrase, setSourcePhrase] = useState('');
  const [targetPhrase, setTargetPhrase] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [message, setMessage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [sourceLanguageName, setSourceLanguageName] = useState('');
  const [temporaryMessage, setTemporaryMessage] = useState('');

  useEffect(() => {
    const fetchMeaning = async () => {
      console.log('Searching on Duden')
      if (sourceLanguageName === 'German') {
        const meaning = await fetchMeaningFromDuden(sourcePhrase);
        setTargetPhrase(meaning);
      }
    };
  
    if (sourcePhrase) {
      fetchMeaning();
    }
  }, [sourcePhrase, sourceLanguageName]);
  
  
  

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/languages/`);
      if (response.ok) {
        const data = await response.json();
        setLanguages(data);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const language = languages.find((lang) => lang.id === sourceLanguage);
    if (language) {
      setSourceLanguageName(language.name);
    }
  }, [sourceLanguage, languages]);

  const fetchMeaningFromDuden = async (word) => {
    setTemporaryMessage('Searching on Duden...');
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/duden/${word}/`
      );
      if (response.ok) {
        const data = await response.json();
        setTemporaryMessage('');
        return data.meaning;
      } else {
        throw new Error("Meaning not found");
      }
    } catch (error) {
      console.error("Error fetching meaning from Duden:", error);
      setTemporaryMessage('');
      setTimeout(() => setMessage('Meaning not found on Duden'), 5000);
      return "";
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/translations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 1,
        source_phrase: { text: sourcePhrase, language: sourceLanguage },
        target_phrase: { text: targetPhrase, language: targetLanguage },
      }),
    });
  
    if (response.ok) {
      const result = await response.json();
      setMessage(result.message);
      onPhraseAdded();
      setSourcePhrase('');
      setTargetPhrase('');
    } else {
      setMessage('Error: Could not add phrase and translation.');
    }
  };
  
  
  return (
    <div className='translation-wrapper display-translation-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Source Phrase:
          </label>
          <input
            type="text"
            value={sourcePhrase}
            onChange={(e) => setSourcePhrase(e.target.value)}
            className="form-control"
            maxLength="510"
          />
        </div>
          <label>
            Source Language:
          <select
            value={sourceLanguage}
            onChange={(e) => {
              setSourceLanguage(e.target.value);
            }}
            
            className="form-control"
          >
            <option value="">Select a language</option>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form-group">
          <label>
            Target Phrase:
          </label>
          <input
            type="text"
            value={temporaryMessage ? temporaryMessage : targetPhrase}
            onChange={(e) => setTargetPhrase(e.target.value)}
            className="form-control"
            maxLength="510"
          />
        </div>
      <label>
        Target Language:
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="form-control"
        >
          <option value="">Select a language</option>
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPhrase;
