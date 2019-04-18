var express = require('express');
var router = express.Router();
var pool = require('../common/database')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET vehicle repair history information listing. */
router.get('/getVehiclerepairhistory', function(req, res, next) {
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
     // console.log(result.rows[0].vehiclecode);
      res.json(result.rows)
     // res.send('vehicle repair history : ' +  res.json(result));
    });
  });
});

/* GET vehicle repair history information listing to customer and vehicle. */
router.get('/getListVehiclerepair', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    //use the client for executing the query
      client.query(`  SELECT vd.vehiclecode
                             , vd.vehicletype
                             , vd.vehiclename
                             , ct.customercode
                             , ct.lastname ||' ' || ct.firstname AS fullname
                             , ct.phone
                             , vph.damagedday                        
                      FROM  vehiclerepairhistory vph
                      LEFT JOIN vehicledetails vd
                       ON  vph.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                       ON ct.customercode = vph.customercode
          `,  function(err, result) {
  
      done(err);
      if(err) {
        return console.error('error running query', err);
      }
      console.log("vehicle repair history" + result.rows);
      res.json(result.rows)
    });
  });
});

/*Search vehicle repair history information listing to customer and vehicle  */
router.post('/searchListVehiclestatus',urlencodedParser,function(req, res, next) {
  var  vehicletype =  req.body.vehicletype
  var  status =  req.body.status
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(`    SELECT vd.vehiclecode
                          , vd.vehicletype
                          , vd.vehiclename
                          , ct.customercode
                          , ct.lastname ||' ' || ct.firstname AS fullname
                          , ct.phone
                          , vph.damagedday 
                          , vph.amountfixed
                          , vd.status                       
                      FROM  vehiclerepairhistory vph
                      LEFT JOIN vehicledetails vd
                      ON  vph.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                      ON ct.customercode = vph.customercode                       
                    WHERE vd.vehicletype ILIKE '%${vehicletype}%' 
                     OR   vd.status ILIKE '%${status}%'        
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
       res.json(result.rows)
  });
  });
 });

module.exports = router;

