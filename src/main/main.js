// all initial configs go here

// ES6
if (process.env.NODE_ENV !== 'production')
  require('babel-register');

// start the main app
require('./app.js');
