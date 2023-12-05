import React from 'react';
import { Link } from 'react-router-dom';
import MagnifyingGlassSvg from './magnifyingGlass.svg'; // Adjust the path accordingly
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-column">
        <ul>
          <li><Link to="/SmallWorld">SmallWorld</Link></li>
        </ul>
      </div>
      <div className="navbar-column">
        <ul>
          <li>
            <Link to="/">
              <img src={MagnifyingGlassSvg} alt="Search" />
            </Link>
          </li>
          {/* Add more Link components for additional pages */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
