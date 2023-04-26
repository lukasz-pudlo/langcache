import React, { useState } from 'react';

const AddLanguage = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/languages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        code,
      }),
    });

    if (response.ok) {
      setMessage('Language added successfully.');
      setName('');
      setCode('');
    } else {
      setMessage('Error: Could not add language.');
    }
  };

  return (
    <div className="language-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>
            Code:
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit">Add Language</button>
      </form>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddLanguage;
