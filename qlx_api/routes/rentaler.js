var express = require('express');
var router = express.Router();
var pool = require('../common/database')

/* GET rentalers listing. */
router.get('/rentaler', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
   
    //use the client for executing the query
    client.query('SELECT * FROM rentaler ',  function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
 
      if(err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
    //  res.send('rentaler information' + res.json(result));
    });
  });
});


module.exports = router;
