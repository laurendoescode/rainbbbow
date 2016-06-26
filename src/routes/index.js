import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import content from './content';
import error from './error';

import weekView from './weekView';
import monthView from './monthView';

export default {

  path: '/',

  children: [
    home,
    contact,
    login,
    weekView,
    monthView,
    content,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
