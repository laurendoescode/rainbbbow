import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.css';
import Link from '../Link';

function About() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.copy}>
            <h3>About</h3>
            <p>
              simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummys with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              <br/>
              <br/>
              Created by Designer <a href="http://laurenkelly.me/">Lauren Kelly</a> and Developer Charles Bancroft, otherwise known as <a href="http://hellotrio.com/">Hello trio</a>.
            </p>
        </div>
        <div className={s.button}>
            <p>Want to know how we made it?</p>
            <button>Read the case study</button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(About);
