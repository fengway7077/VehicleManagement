var express = require('express');
var router = express.Router();
var pool = require('../common/database')


/* Get customer information listing. */
router.get('/', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
   
    //use the client for executing the query
    client.query('SELECT * FROM customer ',  function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
 
      if(err) {
        return console.error('error running query', err);
      }
      console.log("test");
      res.send('customer information' + res.json(result));
    });
  });

});
/* Update customer  */
// router.get('/', function(req, res, next) {
  
// });

module.exports = router;
