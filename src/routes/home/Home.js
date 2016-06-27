import _ from 'lodash';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Home.css';
import Link from '../../components/Link';
import logoUrl from './logo.png';
import aboutIconUrl from './nav_about.svg';
import spreadIconUrl from './nav_spread.svg';
import majorityIconUrl from './nav_majority.svg';
import monthIconUrl from './nav_month.svg';
import weekIconUrl from './nav_week.svg';
import WeekViewSpread from '../../components/WeekViewSpread';
import WeekViewMajority from '../../components/WeekViewMajority';
import MonthViewSpread from '../../components/MonthViewSpread';
import MonthViewMajority from '../../components/MonthViewMajority';

const titleBase = 'Rainbbbow | Colour trends on Dribbble';

const monthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

class Home extends React.Component {
  constructor(props, context) {
    super(props);
    context.setTitle(titleBase);
    this.state = {
      dateType: 'week',
      viewType: 'spread',
      aboutShown: false
    };
  }
  switchDateType(dateType, e) {
    e.preventDefault();
    if(this.state.dateType != dateType) {
      this.setState({dateType});
    }
  }
  switchViewType(viewType, e) {
    e.preventDefault();
    if(this.state.viewType != viewType) {
      this.setState({viewType});
    }
  }
  toggleAbout(e) {
    e.preventDefault();
    this.setState({aboutShown: !this.state.aboutShown});
  }
  renderMonth(number, month) {
    const name = monthNames[number];
    if(this.state.dateType === 'week') {
      return this.state.viewType === 'spread' ? <WeekViewSpread name={name} month={month} /> : <WeekViewMajority name={name} month={month} />;
    } else {
      return this.state.viewType === 'spread' ? <MonthViewSpread name={name} month={month} /> : <MonthViewMajority name={name} month={month} />;
    }
  }
  sortKeys(obj) {
    return _.reverse(_.keys(obj));
  }
  render() {
    const groupedMonths =_.groupBy(this.props.data, (item) => {
      return parseInt(item.date.split('-')[1], 10);
    });
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.headerRoot}>
            <div className={s.headerContainer}>
              <div className={s.logo}>
                <Link to="/">
                  <img src={logoUrl} width="180" height="41" alt="Rainbbbow" title="Rainbbbow" />
                </Link>
                <h1 className={s.heading}>Colour trends on dribbble</h1>
              </div>
              <div className={s.navigationRoot} role="navigation">
                <a title="Week" className={this.state.dateType === 'week' ? cx(s.icon, s.active) : s.icon} onClick={this.switchDateType.bind(this, 'week')}>
                  <img src={weekIconUrl}  width="44" height="44" alt="Week" />
                  <h3 className={s.label}>Week</h3>
                </a>
                <a title="Month" className={this.state.dateType === 'month' ? cx(s.icon, s.active) : s.icon} onClick={this.switchDateType.bind(this, 'month')}>
                  <img src={monthIconUrl}  width="44" height="44" alt="Month" />
                  <h3 className={s.label}>Month</h3>
                </a>
                <span className={s.divider}>|</span>
                <a title="Majority" className={this.state.viewType === 'majority' ? cx(s.icon, s.active) : s.icon} onClick={this.switchViewType.bind(this, 'majority')}>
                  <img src={majorityIconUrl}  width="44" height="44" alt="Majority" />
                  <h3 className={s.label}>Majority</h3>
                </a>
                <a title="Spread" className={this.state.viewType === 'spread' ? cx(s.icon, s.active) : s.icon} onClick={this.switchViewType.bind(this, 'spread')}>
                  <img src={spreadIconUrl}  width="44" height="44" alt="Spread" />
                  <h3 className={s.label}>Spread</h3>
                </a>
                <a title="About" className={this.state.aboutShown ? cx(s.icon, s.active) : s.icon} onClick={this.toggleAbout.bind(this)}>
                  <img src={aboutIconUrl}  width="44" height="44" alt="About" />
                  <h3 className={s.label}>About</h3>
                </a>
              </div>
            </div>
            <div className={this.state.aboutShown ? cx(s.about, s.show) : s.about}>
              <h2 className={s.aboutHeading}>About</h2>
              <p>Rainbbbow documents the most popular colours of designers’ shots uploaded to Dribbble. Looking at daily and monthy data we can see the trends in which colours are used the most. Using our own algorithm we’ve weighted the data to aid visualisation of the colours used, from the most popular to the least popular.</p>
              <p>Created by Designer Lauren Kelly and Developer Charles Bancroft, otherwise known as Hello trio.</p>
            </div>
          </div>
          {_.map(this.sortKeys(groupedMonths), (key) => (
            <section key={key} className={s.month}>
              {this.renderMonth(key, groupedMonths[key])}
            </section>
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    red: PropTypes.number.isRequired,
    orange: PropTypes.number.isRequired,
    yellow: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    cyan: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired,
    purple: PropTypes.number.isRequired,
    pink: PropTypes.number.isRequired,
  })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
