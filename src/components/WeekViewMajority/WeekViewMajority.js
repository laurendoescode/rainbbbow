import _ from 'lodash';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WeekViewMajority.css';
import Sidebar from '../../components/Sidebar';

function WeekViewMajority({ name, month }, context) {
  const days = month.sort((a, b) => new Date(a.date) - new Date(b.date)).map((curr, idx) => {
    const max = Object.keys(_.omit(curr, 'date')).reduce(function(a, b){ return curr[a] > curr[b] ? a : b });
    const value = parseFloat(curr[max]).toFixed(0);
    return (
      <div className={s.dayMajority} key={idx}>
        <div className={s[max]}>
          <div className={s.date}>{idx % 7 === 0 || (idx + 1) % 7 === 0 ? idx + 1 : null}</div>
          <span>{value}%</span>
        </div>
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

export default withStyles(s)(WeekViewMajority);
