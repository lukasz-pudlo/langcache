import React, { useState } from 'react';

const AddPhrase = () => {
  const [sourcePhrase, setSourcePhrase] = useState('');
  const [targetPhrase, setTargetPhrase] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/translations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_phrase: sourcePhrase,
        target_phrase: targetPhrase,
        source_language: sourceLanguage,
        target_language: targetLanguage,
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
      <h2>Add Phrase</h2>
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
          <input
            type="text"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target Language:
          <input
            type="text"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPhrase;
