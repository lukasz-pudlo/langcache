import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();

    return (
      <header>
        <nav>
          <ul>
            <li>
            <NavLink to="/upload_text" className={location.pathname === '/upload_text' ? 'active-link' : ''}>
              Upload Text
            </NavLink>
            </li>
            <li>
            <NavLink to="/translations" className={location.pathname === '/translations' ? 'active-link' : ''}>
              Display Translations
            </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  

export default Navbar;
