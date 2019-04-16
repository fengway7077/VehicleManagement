var express = require('express');
var router = express.Router();
var pool = require('../common/database')

/* GET vehicle repair history information listing. */
router.get('/', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
   
    //use the client for executing the query
      client.query('SELECT * FROM vehiclerepairhistory ',  function(err, result) {
  
      done(err);
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].vehiclecode);
      res.send('vehicle repair history : ' +  res.json(result));
    });
  });

});

module.exports = router;

