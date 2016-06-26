/* eslint-disable max-len */
/* jscs:disable maximumLineLength */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' },
};

export const auth = {
  dribbble: {
    access_token: process.env.DRIBBBLE_ACCESS_TOKEN || 'cd5e5e75c294fb0562bc6c2919cf0b5446de6350fa2116609492adb6db5554e1'
  },
};
