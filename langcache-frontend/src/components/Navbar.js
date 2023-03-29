import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/add_phrase" activeClassName="active-link">
                Add Phrase
              </NavLink>
            </li>
            <li>
              <NavLink to="/upload_text" activeClassName="active-link">
                Upload Text
              </NavLink>
            </li>
            <li>
              <NavLink to="/translations" activeClassName="active-link">
                Display Translations
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  

export default Navbar;
