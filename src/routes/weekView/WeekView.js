import _ from 'lodash';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WeekView.css';
import Sidebar from '../../components/Sidebar';

const title = 'Week View';

function WeekView({ week }, context) {
  context.setTitle(title);
  const days = week.sort((a, b) => new Date(a.date) - new Date(b.date)).map((curr, idx) => {
    // return (
    //   <div className={s.daySpread} key={idx}>
    //     <div className={s.date}>{idx % 7 === 0 || (idx + 1) % 7 === 0 ? idx + 1 : null}</div>
    //     <div className={s.red} style={{height: curr.red + '%'}} />
    //     <div className={s.orange} style={{height: curr.orange + '%'}} />
    //     <div className={s.yellow} style={{height: curr.yellow + '%'}} />
    //     <div className={s.green} style={{height: curr.green + '%'}} />
    //     <div className={s.cyan} style={{height: curr.cyan + '%'}} />
    //     <div className={s.blue} style={{height: curr.blue + '%'}} />
    //     <div className={s.purple} style={{height: curr.purple + '%'}} />
    //     <div className={s.pink} style={{height: curr.pink + '%'}} />
    //   </div>
    // );
    const max = Object.keys(_.omit(curr, 'date')).reduce(function(a, b){ return curr[a] > curr[b] ? a : b });
    const value = parseFloat(curr[max]).toFixed(0);
    return (
      <div className={s.dayMajority} key={idx}>
        <div className={s.date}>{idx % 7 === 0 || (idx + 1) % 7 === 0 ? idx + 1 : null}</div>
        <div className={s[max]}>
          <span>{value}%</span>
        </div>
      </div>
    );
  })
  return (
    <div className={s.root}>
      <Sidebar />
      <div className={s.container}>
        {days}
      </div>
    </div>
  );
}

WeekView.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(WeekView);
