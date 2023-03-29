import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
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
    </header>
  );
};

export default Navbar;
