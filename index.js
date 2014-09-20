(function(){

  var chalk = require('chalk'),
      q = require('q');

  function hideLogs () {
    switch(process.env.HIDE_SE_LOG) {
      case 'true':
        return true;
      case 'false':
      case undefined:
        return false;
      default:
        var message = 'Warning: Invalid value for HIDE_SE_LOG (must be "true" or "false")';
        console.log(chalk.yellow(' > ') + message);
        return false;
    }
  }

  function logError (err) {
    if(!hideLogs()) {
      var message = 'Error starting Express.js application. Exiting...';
      console.log(chalk.red(" ✘ ") + message);
    }
  }

  function logSuccess () {
    if(!hideLogs()) {
      var message = 'Express.js application started successfully';
      console.log(chalk.green(" ✔ ") + message);
    }
  }

  function logMissingModule (module) {
    if(!hideLogs()) {
      var message = 'Cannot find module "'+module+'". Is it installed?';
      console.log(chalk.red(" ✘ ") + message);
    }
  }

  exports.start = function (app, services) {
    var servicePromises = [];
    services = services || [];
    for(var i=0; i<services.length; i++) {
      var module = 'start-express-'+services[i];
      try {
        servicePromises.push(require(module).start(app));
      } catch (err) {
        logMissingModule(module);
        var deferred = q.defer();
        servicePromises.push(deferred.promise);
        deferred.reject();
      }
    }
    return q.all(servicePromises)
    .then(logSuccess)
    .fail(function(){
      logError();
      process.exit(1);
    });
  };

}).call(this);
