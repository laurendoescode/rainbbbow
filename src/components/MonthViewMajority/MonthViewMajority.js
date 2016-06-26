import _ from 'lodash';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MonthViewMajority.css';
import Sidebar from '../../components/Sidebar';

function MonthViewMajority({ name, month }, context) {
  const days = month.sort((a, b) => new Date(a.date) - new Date(b.date)).map((curr, idx) => {
    const max = Object.keys(_.omit(curr, 'date')).reduce(function(a, b){ return curr[a] > curr[b] ? a : b });
    return (
      <div className={s.dayMajority} key={idx}>
        <div className={s[max]}>
          <div className={s.date}>{idx % 7 === 0 ? idx + 1 : null}</div>
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

export default withStyles(s)(MonthViewMajority);
