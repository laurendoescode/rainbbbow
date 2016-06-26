import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo.png';

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation />
        <Link className={s.logo} to="/">
          <img src={logoUrl} width="220" height="50" alt="Rainbbbow" />
          <h1 className={s.heading}>Colour trends on dribbble</h1>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
