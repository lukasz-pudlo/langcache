import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddPhrase } from './components/AddPhrase';
import UploadText from './components/UploadText';
import DisplayTranslations from './components/DisplayTranslations';
import Navbar from './components/Navbar';
import AddLanguage from './components/AddLanguage';



function App() {
  const [translations, setTranslations] = useState([]);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const handleNewTranslationAdded = (newTranslation) => {
    setTranslations([...translations, newTranslation]);
    setCurrentTranslationIndex(translations.length);
  };
  return (
    <Router>
      <Navbar />
      
      <div className="content-container">
        <Routes>
        <Route
          path="/add_phrase"
          element={<AddPhrase onNewTranslationAdded={handleNewTranslationAdded} />}
        />
          <Route path="/upload_text" element={<UploadText />} />
          <Route
            path="/translations"
            element={
              <DisplayTranslations
              
                translations={translations}
                setTranslations={setTranslations}
                currentTranslationIndex={currentTranslationIndex}
                setCurrentTranslationIndex={setCurrentTranslationIndex}
              />
            }
          />
          <Route path="/languages" element={<AddLanguage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
