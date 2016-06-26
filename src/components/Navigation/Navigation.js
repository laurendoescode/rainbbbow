import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import aboutIconUrl from './nav_about.svg';
import spreadIconUrl from './nav_spread.svg';
import majorityIconUrl from './nav_majority.svg';
import monthIconUrl from './nav_month.svg';
import weekIconUrl from './nav_week.svg';

function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.icon} to="/week">
        <img src={weekIconUrl}  width="44" height="44" alt="Week" />
        <h3 className={s.label}>Week</h3>
      </Link>
      <Link className={s.icon} to="/month">
        <img src={monthIconUrl}  width="44" height="44" alt="Month" />
        <h3 className={s.label}>Month</h3>
      </Link>
      <span className={s.divider}>|</span>
      <Link className={s.icon} to="/majority">
        <img src={majorityIconUrl}  width="44" height="44" alt="Majority" />
        <h3 className={s.label}>Majority</h3>
      </Link>
      <Link className={s.icon} to="/spread">
        <img src={spreadIconUrl}  width="44" height="44" alt="Spread" />
        <h3 className={s.label}>Spread</h3>
      </Link>
      <Link className={s.icon} to="/about">
        <img src={aboutIconUrl}  width="44" height="44" alt="About" />
        <h3 className={s.label}>About</h3>
      </Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Navigation);
