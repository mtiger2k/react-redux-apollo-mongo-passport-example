import React from 'react';
import { Link } from 'react-router';

import Profile from '../components/Profile';
import NavbarLink from '../components/NavbarLink';

const Layout = ({ children, params, location }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">SharedApp</Link>
        </div>

        <ul className="nav navbar-nav">
          <NavbarLink
            title="Calculator"
            href="/calculator"
            active={location.pathname.indexOf('calculator') !== -1}
          />
          <NavbarLink
            title="News"
            href="/news"
            active={location.pathname.indexOf('news') !== -1}
          />
          <NavbarLink
            title="Counter"
            href="/counter"
            active={location.pathname.indexOf('counter') !== -1}
          />
          <NavbarLink
              title="Private"
              href="/test"
              active={location.pathname.indexOf('test') !== -1}
          />
        </ul>

        <Profile />
      </div>
    </nav>
    <div className="container">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  params: React.PropTypes.shape({
    type: React.PropTypes.string,
  }).isRequired,
  children: React.PropTypes.element,
};

export default Layout;
