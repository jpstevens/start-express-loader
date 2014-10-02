# start-express-loader
[![Build Status](https://travis-ci.org/jpstevens/start-express-loader.svg?branch=master)](https://travis-ci.org/jpstevens/start-express-loader)
![Downloads/month](http://img.shields.io/npm/dm/start-express-loader.svg)

A promise-based service loader for Express.js

## Installation

```bash
$ npm install start-express-loader --save
```

## Example Usage:

First, install some things to load (for example, a Mongoose connection, or HTTP server):

```bash
npm install start-express-http start-express-mongoose --save
```

Then, in your javascript:

```javascript
var app = require('express')(),
    services = ['http','mongoose']; // define our services here
    // will load 'start-express-http' and 'start-express-mongoose'

// start HTTP server
require('start-express-loader')
.start(app, services)
.then(function() { /* do something */ });
```

Your app is now up-and-running!

## Hiding Log Output:

By default, this module output various logs to the command line. To hide this output, set the `HIDE_SE_LOG` flag to `true`:

```bash
$ HIDE_SE_LOG=true npm start
```

`HIDE_SE_LOG` can equal `true` or `false` (default `false`).
