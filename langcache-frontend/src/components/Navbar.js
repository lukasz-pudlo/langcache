import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/upload_text">Text</a>
              </li>
            </li>
            <li className="nav-item">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/translations">Translations</a>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
