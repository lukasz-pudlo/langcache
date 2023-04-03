import React, { useState, useEffect } from 'react';


const AddPhrase = ({ onPhraseAdded }) => {
  const [sourcePhrase, setSourcePhrase] = useState('');
  const [targetPhrase, setTargetPhrase] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [message, setMessage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [germanLanguageId, setGermanLanguageId] = useState(null);

  useEffect(() => {
    const fetchMeaning = async () => {
      if (sourceLanguage === germanLanguageId && sourcePhrase) {
        console.log('fetching meaning from Duden...');
        setTargetPhrase("Searching on Duden...");
        const meaning = await fetchMeaningFromDuden(sourcePhrase);
        if (meaning) {
          setTargetPhrase(meaning.slice(0, 510));
        } else {
          setTargetPhrase('');
          setMessage('Meaning not found on Duden');
          setTimeout(() => setMessage(''), 5000);
        }
      }
    };
  
    fetchMeaning();
  }, [sourcePhrase, sourceLanguage, germanLanguageId]);
  
  

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/languages/`);
      if (response.ok) {
        const data = await response.json();
        setLanguages(data);
        // Find the ID for the German language
        const germanLanguage = data.find((language) => language.name === 'German');
        if (germanLanguage) {
          setGermanLanguageId(germanLanguage.id);
        }
      }
    };
  
    fetchLanguages();
  }, []);
  

  const fetchMeaningFromDuden = async (word) => {
    setMessage('Searching on Duden...');
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/duden?word=${word}`

      );
      if (response.ok) {
        const data = await response.json();
        setMessage('');
        return data.meaning;
      } else {
        setMessage('Meaning not found on Duden');
        setTimeout(() => {
          setMessage('');
        }, 5000);
        return '';
      }
    } catch (error) {
      console.error('Error fetching meaning from Duden:', error);
      setMessage('Meaning not found on Duden');
      setTimeout(() => {
        setMessage('');
      }, 5000);
      return '';
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

export { AddPhrase };
