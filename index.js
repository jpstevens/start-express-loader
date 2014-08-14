(function(){

  var chalk = require('chalk'),
      q = require('q');

  exports.start = function (app, services) {
    var servicePromises = [];
    services = services || [];
    for(var i=0; i<services.length; i++) {
      servicePromises.push(require('start-express-'+services[i]).start(app));
    }
    q.all(servicePromises).then(function(){
      var message = "Express.js application started successfully";
      console.log(chalk.green(" ✔ ") + message);
    }).fail(function(err){
      throw err;
    });
  };

}).call(this);
