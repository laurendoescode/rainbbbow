import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export default {

  path: '/',

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
    return <Home data={data.week} />;
  },

};
