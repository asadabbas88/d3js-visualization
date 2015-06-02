'use strict';

var express = require('express');
var controller = require('./export.controller');

var router = express.Router();

router.post('/', controller.exportAsImage);

module.exports = router;
