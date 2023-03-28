import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddPhrase from './components/AddPhrase';
import UploadText from './components/UploadText';
import DisplayTranslations from './components/DisplayTranslations';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/add_phrase">Add Phrase</Link>
            </li>
            <li>
              <Link to="/upload_text">Upload Text</Link>
            </li>
            <li>
              <Link to="/translations">Display Translations</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/add_phrase" element={<AddPhrase />} />
          <Route path="/upload_text" element={<UploadText />} />
          <Route path="/translations" element={<DisplayTranslations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
