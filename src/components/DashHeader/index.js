import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const DashHeader = () => {
  return (
    <header className="dash-header border-b border-solid border-b-gray-200">
      <div className="dash-header__container m-2">
        <Link to="/dashboard/notes">
          <h1 className="dash-header__title text-2xl">Notes Manager</h1>
        </Link>
        <nav className="dash-header__nav">{/* add */}</nav>
      </div>
    </header>
  );
};

export default DashHeader;
