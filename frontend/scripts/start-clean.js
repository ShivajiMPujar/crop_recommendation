#!/usr/bin/env node
// start-clean.js
// Clears environment variables that can cause webpack-dev-server schema errors

const varsToRemove = [
  'ALLOWED_HOSTS',
  'ALLOWEDHOSTS',
  'WDS_SOCKET_HOST',
  'WDS_SOCKET_PORT',
  'WEBPACK_DEV_SERVER_ALLOWED_HOSTS',
  'DEV_SERVER_ALLOWED_HOSTS',
  'HOST'
];

varsToRemove.forEach(v => {
  if (process.env[v] !== undefined) {
    try {
      delete process.env[v];
      // eslint-disable-next-line no-console
      console.log(`Cleared env var: ${v}`);
    } catch (e) {
      // ignore
    }
  }
});

// Launch CRA start script
require('react-scripts/scripts/start');
