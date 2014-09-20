startExpressLoader = require('../index');
var app = require('express')();
startExpressLoader.start(app, ['http','mongoose']);
