import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Groups</Link></li>
        <li><Link to="/friends">Friends</Link></li>
        <li><Link to="/activity">Activity</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
