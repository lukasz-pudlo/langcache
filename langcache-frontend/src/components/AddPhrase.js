import React, { useState, useEffect } from 'react';


const AddPhrase = ({ onPhraseAdded }) => {
  const [sourcePhrase, setSourcePhrase] = useState('');
  const [targetPhrase, setTargetPhrase] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('');
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('');
  const [message, setMessage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);


  useEffect(() => {
    const fetchMeaning = async () => {
      if (sourcePhrase && selectedSourceLanguage && selectedTargetLanguage) {
        clearTimeout(typingTimeout);
        setTypingTimeout(
          setTimeout(async () => {
            setTargetPhrase("Searching...");
            const meaning = await fetchTranslationFromChatGPT(sourcePhrase, selectedSourceLanguage, selectedTargetLanguage);
            if (meaning) {
              setTargetPhrase(meaning);
            } else {
              setTargetPhrase('');
              setMessage('Meaning not found');
              setTimeout(() => setMessage(''), 5000);
            }
          }, 3000)
        );
      }
    };


    if (sourcePhrase && selectedSourceLanguage && selectedTargetLanguage) {
      fetchMeaning();
    }
  }, [sourcePhrase, selectedSourceLanguage, selectedTargetLanguage]);


  const handleSourceLanguageChange = (e) => {
    const selectedLanguageId = e.target.value;
    setSourceLanguage(selectedLanguageId);
    // Find the selected language name
    const selectedSourceLanguage = languages.find((language) => language.id.toString() === selectedLanguageId);
    setSelectedSourceLanguage(selectedSourceLanguage);
  };

  const handleTargetLanguageChange = (e) => {
    const selectedLanguageId = e.target.value;
    setTargetLanguage(selectedLanguageId);
    // Find the selected language name
    const selectedTargetLanguage = languages.find((language) => language.id.toString() === selectedLanguageId);
    setSelectedTargetLanguage(selectedTargetLanguage);
  }

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


  async function fetchTranslationFromChatGPT(word, selectedSourceLanguage, selectedTargetLanguage) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/gpt/${word}/${selectedSourceLanguage.name}/${selectedTargetLanguage.name}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.meaning.replace(/"/g, '');
      } else {
        console.error('Error fetching translation:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
      return null;
    }
  }



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
    <div className='translation-wrapper display-translation-wrapper mt-3'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className="col">
            <input
              type="text"
              value={sourcePhrase}
              placeholder="Source phrase"
              onChange={(e) => setSourcePhrase(e.target.value)}
              className="form-control"
              id="source-phrase"
              maxLength="510"
              aria-label="Source phrase"
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Target phrase"
              value={targetPhrase}
              onChange={(e) => setTargetPhrase(e.target.value)}
              className="form-control"
              id="target-phrase"
              maxLength="510"
              aria-label="Target phrase"
            />
          </div>
        </div>
        <div className='row align-items-center'>
          <div className='col mt-2'>
            <select
              value={sourceLanguage}
              onChange={handleSourceLanguageChange}
              className="form-control"
              id="source-language"
            >
              <option value="">Source language</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>

          </div>
          <div className='col mt-2'>
            <select
              value={targetLanguage}
              onChange={handleTargetLanguageChange}
              className="form-control"
              id="target-language"
            >
              <option value="">Target language</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <button class="btn btn-primary" type="submit">Add</button>
      </form>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export { AddPhrase };
