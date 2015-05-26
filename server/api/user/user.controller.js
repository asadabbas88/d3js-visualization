'use strict';

var _ = require('lodash');
var stormpath = require('stormpath');


var apiKey = new stormpath.ApiKey(
  process.env['STORMPATH_API_KEY_ID'],
  process.env['STORMPATH_API_KEY_SECRET']
);

var client = new stormpath.Client({apiKey: apiKey});

exports.getDirectory = function(req, res) {
  var href = req.query.href;
  client.getDirectory(href, {expand:'customData'}, function(err, directory) {
    console.log(directory);
    res.json(directory);
  });
};
