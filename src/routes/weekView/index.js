import React from 'react';
import WeekView from './WeekView';
import fetch from '../../core/fetch';

export default {

  path: '/week',

  async action() {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{week{date, red, orange, yellow, green, cyan, blue, pink, purple}}',
    }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.week) throw new Error('Failed to load.');
    return <WeekView week={data.week} />;
  },

};