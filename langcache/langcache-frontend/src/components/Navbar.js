import React from 'react';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" id="nav-text" href="/upload_text">Text</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="nav-translations" href="/translations">Translations</a>
            </li>
          </ul>
        </div>
    </nav>
  );
};
export default Navbar;
