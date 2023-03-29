import React, { useState, useEffect } from 'react';


const AddPhrase = () => {
  const [sourcePhrase, setSourcePhrase] = useState('');
  const [targetPhrase, setTargetPhrase] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [message, setMessage] = useState('');

  const [languages, setLanguages] = useState([]);

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
    } else {
      setMessage('Error: Could not add phrase and translation.');
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Source Phrase:
          <input
            type="text"
            value={sourcePhrase}
            onChange={(e) => setSourcePhrase(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target Phrase:
          <input
            type="text"
            value={targetPhrase}
            onChange={(e) => setTargetPhrase(e.target.value)}
          />
        </label>
        <br />
        <label>
        Source Language:
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
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
      <label>
        Target Language:
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPhrase;
