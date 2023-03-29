import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPhrase from './components/AddPhrase';
import UploadText from './components/UploadText';
import DisplayTranslations from './components/DisplayTranslations';
import Navbar from './components/Navbar';
import './index.css';


function App() {
  return (
    <Router>
      <div>
        <Navbar />

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
