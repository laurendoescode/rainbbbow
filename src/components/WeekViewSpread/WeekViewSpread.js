import _ from 'lodash';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WeekViewSpread.css';
import Sidebar from '../../components/Sidebar';

function WeekViewSpread({ name, month }, context) {
  const days = month.sort((a, b) => new Date(a.date) - new Date(b.date)).map((curr, idx) => {
    return (
      <div className={s.daySpread} key={idx}>
        <div className={s.date}>{idx % 7 === 0 || (idx + 1) % 7 === 0 ? idx + 1 : null}</div>
        <div className={s.red} style={{height: curr.red + '%'}} />
        <div className={s.orange} style={{height: curr.orange + '%'}} />
        <div className={s.yellow} style={{height: curr.yellow + '%'}} />
        <div className={s.green} style={{height: curr.green + '%'}} />
        <div className={s.cyan} style={{height: curr.cyan + '%'}} />
        <div className={s.blue} style={{height: curr.blue + '%'}} />
        <div className={s.purple} style={{height: curr.purple + '%'}} />
        <div className={s.pink} style={{height: curr.pink + '%'}} />
      </div>
    );
  })
  return (
    <div className={s.root}>
      <Sidebar name={name} />
      <div className={s.container}>
        {days}
      </div>
    </div>
  );
}

export default withStyles(s)(WeekViewSpread);
