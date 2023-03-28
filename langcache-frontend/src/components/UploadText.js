import React, { useState } from 'react';

const UploadText = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/upload_text/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const result = await response.json();
      setMessage(result.message);
    } else {
      setMessage('Error: Could not upload and process the text.');
    }
  };

  return (
    <div>
      <h2>Upload Text</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button type="submit">Upload</button>
        </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadText;
