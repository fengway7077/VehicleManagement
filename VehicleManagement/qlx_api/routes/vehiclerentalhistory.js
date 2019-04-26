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
                          , vd.rentalprice
                          , vd.status
                          , vrh1.damagedday
                      FROM  vehiclerentalhistory vrh
                      LEFT JOIN vehicledetails vd
                        ON  vrh.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                        ON ct.customercode = vrh.customercode 
                      LEFT OUTER JOIN vehiclerepairhistory vrh1
                        ON   vrh1.vehiclecode = vd.vehiclecode
                        AND  vrh1.customercode = ct.customercode  
                        `  ,  function(err, result) {
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
  var fullname  = req.body.fullname
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
                          , vd.rentalprice
                      FROM  vehiclerentalhistory vrh
                      LEFT JOIN vehicledetails vd
                        ON  vrh.vehiclecode = vd.vehiclecode
                      LEFT JOIN customer ct
                        ON ct.customercode = vrh.customercode
                      WHERE ct.firstname ILIKE '%${firstname}%'  
                       OR  ct.lastname ILIKE '%${lastname}%' 
                       OR ct.fullname ILIKE  '%${fullname}%'        
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

 /*Update vehicle rental history information   */
router.post('/editVehiclerental',urlencodedParser,function(req, res, next) {
  console.log(req.body);
  
  var  vehiclecode =  req.body.vehiclecode
  var  customercode =  req.body.customercode
  var  rentaldate =  req.body.rentaldate  
  var  payday =  req.body.payday 
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` UPDATE vehiclerentalhistory SET  payday = '${payday}'  
                                               WHERE vehiclecode = '${vehiclecode}'  
                                                  AND  customercode = '${customercode}'  
                                                  AND  rentaldate =   '${rentaldate}'       
                                              `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.json(result)
      
     //res.send('Updating is a Vehicle information ');
  });
  });
 });

 /*Adding vehicle rental history information  */
 router.post('/addVehiclerental',urlencodedParser,function(req, res, next) {
  var  vehiclecode =  req.body.vehiclecode
  var  customercode =  req.body.customercode
  var  rentaldate =  req.body.rentaldate 
  var payday = req.body.payday
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` INSERT INTO vehiclerentalhistory( vehiclecode , customercode , rentaldate , payday )  VALUES ( '${vehiclecode}','${customercode}','${rentaldate}', '${payday}') ;         
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
        console.log("Updating");
       res.json(result);
   //  res.send('Updating is a record from vehicle rental history information : ' + customercode);
  });
  });
 });

    /*Remove vehicle rental history information  */
    router.post('/removeVehiclerental',urlencodedParser,function(req, res, next) {
      var  vehiclecode =  req.body.vehiclecode
      var  customercode =  req.body.customercode
      var  rentaldate =  req.body.rentaldate 
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }  
        client.query(` DELETE FROM  vehiclerentalhistory
                              WHERE vehiclecode = '${vehiclecode}'  
                                  AND  customercode = '${customercode}'  
                                  AND  rentaldate =   '${rentaldate}'         
                          `,  function(err, result) {
         done(err);
          if(err) {
            return console.error('error running query', err);
          }
            console.log("Removing");
            res.json(result);
        // res.send('Removing is a record from vehicle rental history information : ' + customercode);
      });
      });
     });

     /*Check vehicle rental history information  */
    router.post('/checkVehiclerental',urlencodedParser,function(req, res, next) {
      var  vehiclecode =  req.body.vehiclecode
      var  customercode =  req.body.customercode
      var  rentaldate =  req.body.rentaldate 
      console.log("test");
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }  
        client.query(` SELECT *  FROM  vehiclerentalhistory
                                 WHERE vehiclecode = '${vehiclecode}'  
                                     AND  customercode = '${customercode}'  
                                     AND  rentaldate =   '${rentaldate}'         
                          `,  function(err, result) {
         done(err);
          if(err) {
            return console.error('error running query', err);
          }
            console.log("Check");
            res.json(result);   
           // res.send('Checking is a record from vehicle rental history information : ' ); 
      });
      });
     });

 
module.exports = router;

