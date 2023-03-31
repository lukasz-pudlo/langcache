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
              Text
            </NavLink>
            </li>
            <li>
            <NavLink to="/translations" className={location.pathname === '/translations' ? 'active-link' : ''}>
              Translations
            </NavLink>
            </li>
            <li>
            <NavLink to="/languages" className={location.pathname === '/languages' ? 'active-link' : ''}>
              Languages
            </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  

export default Navbar;
