var express = require('express');
var router = express.Router();
var pool = require('../common/database')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET vehicle rental history information listing. */
router.get('/getVehiclerentalhistory', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    } 
    //use the client for executing the query
      client.query('SELECT * FROM vehiclerentalhistory ',  function(err, result) {

      done(err);
      if(err) {
        return console.error('error running query', err);
      }
      //console.log(result.rows[0].vehiclecode);
      res.json(result.rows)
    //  res.send('vehicle rental history : ' +  res.json(result));
    });
  });
});

/* Get vehicle rental history information listing to customer and vehicle . */
router.get('/getListVehiclerental', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    //use the client for executing the query
      client.query(`SELECT  vd.vehiclecode
                          , vd.vehicletype
                          , vd.vehiclename
                          , ct.customercode
                          , ct.lastname ||' ' || ct.firstname AS fullname
                          , ct.phone
                          , vrh.rentaldate
                          , vrh.payday
                          , vrh.rentalprice
                          , vd.status
                      FROM  vehiclerentalhistory vrh
                      LEFT JOIN vehicledetails vd
                        ON  vrh.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                        ON ct.customercode = vrh.customercode `  ,  function(err, result) {
      done(err);
      if(err) {
        return console.error('error running query', err);
      }      
      res.json(result.rows)
    //  res.send('vehicle rental history : ' +  res.json(result));
    });
  });
});

/*Search vehicle rental history information listing to customer and vehicle  */
router.post('/searchListVehiclerental',urlencodedParser,function(req, res, next) {
  var  firstname =  req.body.firstname
  var  lastname =  req.body.lastname
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` SELECT  vd.vehiclecode
                          , vd.vehicletype
                          , vd.vehiclename
                          , ct.customercode
                          , ct.lastname ||' ' || ct.firstname AS fullname
                          , ct.phone
                          , vrh.rentaldate
                          , vrh.payday
                          , vrh.rentalprice
                      FROM  vehiclerentalhistory vrh
                      LEFT JOIN vehicledetails vd
                        ON  vrh.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                        ON ct.customercode = vrh.customercode
                        WHERE ct.firstname ILIKE '%${firstname}%'  
                       OR  ct.lastname ILIKE '%${lastname}%'          
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
       res.json(result.rows)
   //  res.send('Searching is a Vehicle information ');
  });
  });
 });



module.exports = router;

