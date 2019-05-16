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
    // console.log(req.body);
    //  return;
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
                          , vd.vehicleimage  
                          , vrh1.payday 
                          , vd.rentalprice                  
                      FROM  vehiclerepairhistory vph
                      LEFT JOIN vehicledetails vd
                        ON  vph.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                        ON ct.customercode = vph.customercode  
                      LEFT OUTER JOIN vehiclerentalhistory vrh1
                        ON   vrh1.vehiclecode = vd.vehiclecode
                        AND  vrh1.customercode = ct.customercode                      
                      WHERE vd.vehicletype ILIKE '%${vehicletype}%' 
                         AND   vd.status::text LIKE '%${status}%'
                         AND	vd.vehiclecode IS NOT NULL 
					              	AND ct.customercode IS NOT NULL      
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
       res.json(result.rows)
  });
  });
 });

/*Update vehicle repair history information   */
router.post('/editVehiclerepair',urlencodedParser,function(req, res, next) {
  // console.log(req.body);
  //   return;
  var  vehiclecode =  req.body.vehiclecode
  var  customercode =  req.body.customercode
  var  amountfixed =  req.body.amountfixed 
  var  damagedday =  req.body.damagedday  
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` UPDATE vehiclerepairhistory  SET  amountfixed = '${amountfixed}'                                              
                                                WHERE vehiclecode = '${vehiclecode}'  
                                                  AND  customercode = '${customercode}' 
                                                  AND damagedday =  '${damagedday}'  
                                              `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
      res.json(result)
    // res.send('Updating is a Vehicle repair history  information ');
  });
  });
 });

 /*Adding vehicle rental history information  */
router.post('/addVehiclerepair',urlencodedParser,function(req, res, next) {
  // console.log(req.body);
  // return;
  var  vehiclecode =  req.body.vehiclecode
  var  customercode =  req.body.customercode
  var  amountfixed =  req.body.amountfixed 
  var  damagedday =  req.body.damagedday  
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` INSERT INTO vehiclerepairhistory( 
                                                   vehiclecode
                                                  , customercode
                                                  , amountfixed
                                                  , damagedday)
                                              VALUES (
                                                 '${vehiclecode}'
                                                , '${customercode}'
                                                , '${amountfixed}'
                                                , '${damagedday}'
                                                );                    
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
       res.json(result)
   //  res.send('Adding is a Vehicle information ');
  });
  });
 });

    /*Remove vehicle repair history information  */
    router.post('/removeVehiclerepair',urlencodedParser,function(req, res, next) {
      var  damagedday =  req.body.damagedday  
      var  vehiclecode =  req.body.vehiclecode
      var  customercode =  req.body.customercode
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }  
        client.query(` DELETE FROM  vehiclerepairhistory
                              WHERE damagedday =  '${damagedday}'   
                                 AND  vehiclecode = '${vehiclecode}'  
                                 AND  customercode =   '${customercode}'         
                          `,  function(err, result) {
         done(err);
          if(err) {
            return console.error('error running query', err);
          }
            console.log("Removing");
           res.json(result);
         // res.send('Removing is a record from vehicle repair history information : ' + customercode);
      });
      });
     });

module.exports = router;

