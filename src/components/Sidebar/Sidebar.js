import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.css';
import Link from '../Link';

function Sidebar({ name }) {
  return (
    <div className={s.root}>
      <span className={s.month}>{name}</span>
    </div>
  );
}

export default withStyles(s)(Sidebar);
