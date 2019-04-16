var express = require('express');
var router = express.Router();
var pool = require('../common/database')

var app = express()


//var vehiclecode = req.params.vehiclecode;
/* Get Vehicle information listing. */
router.get('/getVehicle', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
   
    //use the client for executing the query
   // client.query('SELECT * FROM vehicledetails  WHERE vehiclecode =' + 'vehiclecode',  function(err, result) {
      client.query('SELECT * FROM vehicledetails ',  function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if(err) {
        return console.error('error running query', err);
      }
      //res.render("trangchu",{dangxem:vehiclecode,hinh:result.rows[0].vehiclecolor});
         console.log(result.rows[1].vehiclenumber);
          var vehicle = res.json(result)
     //  res.send('Vehicle information : ' + vehicle );
    });
  });

});



/* Update a Vehicle information . */
router.get('/editVehicle', function(req, res, next) {

  var vehiclecode = 1 ;//req.params.vehiclecode;
  var vehiclenumber = '50U 87987' ;//req.params.vehiclenumber;

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
   
    //use the client for executing the query
      client.query('UPDATE vehicledetails SET ' 
                                            + ' vehiclenumber =' + vehiclenumber
                                            // + ' "vehicletype" ='   + vehicletype
                                            // + ' "vehiclecolor" = ' + vehiclecolor
                                            // + ' "purchaseprice" =' + purchaseprice
                                            // + ' "rentalprice"  ='  + rentalprice
                                            // + ' "registrationnumber" =' + registrationnumber
                                            // + ' "managementnumber" =' + managementnumber
                                            // + ' "status" =' + status
                                            // + ' "vehicleimage" = ' + vehicleimage
                                            // + ' "describe" =' + describe
                                            // + ' "flagdelete" = ' +flagdelete    
                                            + 'WHERE vehiclecode =' + vehiclecode,  function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if(err) {
        return console.error('error running query', err);
      }
         console.log("test");         
       res.send('Updating is a Vehicle information ');
    });
  });
});


module.exports = router;
