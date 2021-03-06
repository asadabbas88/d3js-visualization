/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var stormpathExpressSdk = require('stormpath-sdk-express');
var spMiddleware = stormpathExpressSdk.createMiddleware();

module.exports = function(app) {

  spMiddleware.attachDefaults(app);

  // Insert routes below
  app.use('/api/user', spMiddleware.authenticate, require('./api/user'));

  // Insert routes below
  app.use('/api/export', require('./api/export'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
