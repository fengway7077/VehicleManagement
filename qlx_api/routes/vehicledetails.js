var express = require('express');
var router = express.Router();
var pool = require('../common/database')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
/// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// create application/json parser
var jsonParser = bodyParser.json()

//include http, fs and url module
  var http = require('http'),
    fs = require('fs'),
    url = require('url');

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
           res.json(result.rows)
     //  res.send('Vehicle information : ' + vehicle );
    });
  });

});


/* Update a Vehicle information . */
router.post('/editVehicle',urlencodedParser, function(req, res, next) {
        // console.log(req.body);
        // return;
  var vehiclecode = req.body.vehiclecode;
  var vehiclenumber = req.body.vehiclenumber;
  var vehicletype = req.body.vehicletype;
  var vehiclecolor = req.body.vehiclecolor;
  var purchaseprice = Number(req.body.purchaseprice) == NaN ? 0 : req.body.purchaseprice;
  var rentalprice  = Number(req.body.rentalprice);
  var registrationnumber = req.body.registrationnumber;
  var managementnumber = req.body.managementnumber;
  var status  =  req.body.status; //
  var vehicleimage = req.body.vehicleimage;
  var describe  = req.body.describe;
  var flagdelete =  '0';//req.body.flagdelete; //
  var vehiclename = req.body.vehiclename;

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
   
    //use the client for executing the query
      // client.query('UPDATE vehicledetails SET ' 
      //                                       + ' vehiclenumber =' + vehiclenumber
      //                                       // + ' "vehicletype" ='   + vehicletype
      //                                       // + ' "vehiclecolor" = ' + vehiclecolor
      //                                       // + ' "purchaseprice" =' + purchaseprice
      //                                       // + ' "rentalprice"  ='  + rentalprice
      //                                       // + ' "registrationnumber" =' + registrationnumber
      //                                       // + ' "managementnumber" =' + managementnumber
      //                                       // + ' "status" =' + status
      //                                       // + ' "vehicleimage" = ' + vehicleimage
      //                                       // + ' "describe" =' + describe
      //                                       // + ' "flagdelete" = ' +flagdelete    
      //                                       + 'WHERE vehiclecode =' + vehiclecode,  function(err, result) {
         //use the client for executing the query
        client.query(`UPDATE vehicledetails SET vehiclenumber = '${vehiclenumber}'       
                                              , vehicletype = '${vehicletype}'
                                              , vehiclecolor = '${ vehiclecolor}'
                                              , purchaseprice ='${ purchaseprice}'
                                              , rentalprice  ='${rentalprice}'
                                              , registrationnumber = '${ registrationnumber}'
                                              , managementnumber ='${ managementnumber}'
                                              , status  = '${status}'
                                              , vehicleimage = '${ vehicleimage}'
                                              , describe  ='${describe}'
                                              , flagdelete = '${flagdelete }'
                                              , vehiclename = '${vehiclename}'               
                                            WHERE vehiclecode = '${vehiclecode}' `,  function(err, result) {   
      done(err);
      if(err) {
        return console.error('error running query', err);
      }
       res.json(result);   
      // res.send('Updating is a Vehicle information ');
    });
  });
});

/*Search Vehicle information */
router.post('/searchVehicle',urlencodedParser,function(req, res, next) {
  var  vehicletype =  req.body.vehicletype
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` SELECT * FROM vehicledetails
                    WHERE vehicletype ILIKE '%${vehicletype}%'          
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

/* Add a Vehicle information . */
  router.post('/createVehicle',jsonParser, function(req, res, next) {
        // console.log(req.body);
        // return;
     //var vehiclecode = req.body.vehiclecode;
      var vehiclenumber = req.body.vehiclenumber;
      var vehicletype = req.body.vehicletype;
      var vehiclecolor = req.body.vehiclecolor;
      var purchaseprice = Number(req.body.purchaseprice) == NaN ? 0 : req.body.purchaseprice;
      var rentalprice  = Number(req.body.rentalprice) == NaN ? 0 : req.body.rentalprice; 
      var registrationnumber = req.body.registrationnumber;
      var managementnumber = req.body.managementnumber;
      var status  =  req.body.status; //
      var vehicleimage = req.body.vehicleimage;
      var describe  = req.body.describe;
      var flagdelete = '0' ;//req.body.flagdelete; //
      var vehiclename = req.body.vehiclename;
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      
      client.query(`INSERT INTO vehicledetails (vehiclenumber
                                              , vehicletype 
                                              , vehiclecolor
                                              , purchaseprice 
                                              , rentalprice 
                                              , registrationnumber
                                              , managementnumber
                                              , status 
                                              , vehicleimage
                                              , describe 
                                              , flagdelete 
                                              , vehiclename 
                                              )  VALUES(  '${vehiclenumber}'       
                                                        , '${vehicletype}'
                                                        , '${vehiclecolor}'
                                                        , '${purchaseprice}'
                                                        , '${rentalprice}'
                                                        , '${registrationnumber}'
                                                        , '${managementnumber}'
                                                        , '${status}'
                                                        , '${vehicleimage}'
                                                        , '${describe}'
                                                        , '${flagdelete }'
                                                        , '${vehiclename}' 
                                                        )
                                            `,  function(err, result) {   
      done(err);
      if(err) {
         return console.error('error running query', err);
         }
        res.json(result)
        //  console.log("Creating");         
        // res.send('Creating is a Vehicle information ');
    });
   });
  });

  /*Remove records from  a Vehicle information */
router.post('/removeVehicle',urlencodedParser,function(req, res, next) {
  var  vehiclecode =  req.body.vehiclecode
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` DELETE FROM  vehicledetails
                    WHERE vehiclecode = '${vehiclecode}'          
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
       // console.log("Romving");
       res.json(result)
   //   res.send('Removing is a record from Vehicle information ');
  });
  });
 });

  /*Get  records from  a Vehicle information */
router.get('/getVehicleStatus',urlencodedParser,function(req, res, next) {
 // var  vehiclecode =  req.body.vehiclecode
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(`   SELECT  vd.vehiclecode
                            , vd.vehicletype
                            , vd.vehiclename
                            , vd.status
                            , ct.customercode
                            , ct.lastname ||' ' || ct.firstname AS fullname
                            , ct.phone
                            , vrh.rentaldate
                            , vrh.payday
                            , vd.rentalprice
                            , vrh1.amountfixed
                        FROM  vehicledetails vd
                        LEFT JOIN vehiclerentalhistory vrh
                          ON vd.vehiclecode = vrh.vehiclecode 
                        LEFT JOIN vehiclerepairhistory vrh1
                          ON vd.vehiclecode = vrh1.vehiclecode
                        AND vrh1.customercode = vrh.customercode
                        LEFT JOIN customer ct
                          ON ct.customercode = vrh.customercode         
                      `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
      //  console.log("GET");
     // res.send('Vehicle information ');
  });
  });
 });

  /*Check records from  a Vehicle information */
  router.post('/checkVehicle',function(req, res, next) { 
    // console.log(req.body);
    // return;
    var  vehiclecode =  req.body.vehiclecode
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }  
      client.query(` SELECT vehiclecode ,vehiclename FROM  vehicledetails  WHERE vehiclecode = '${vehiclecode}'                           
                        `,  function(err, result) {
       done(err);
        if(err) {
          return console.error('error running query', err);
        }        
          res.json(result.rows);  
    });
    });
   });

   /*Flag records from  a Vehicle information */
  router.post('/flagVehicle',function(req, res, next) { 
    var  vehiclecode =  req.body.vehiclecode
    var flagdelete = req.body.flagdelete
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }  
      client.query(` UPDATE vehicledetails SET flagdelete = '${flagdelete}'
                        WHERE vehiclecode = '${vehiclecode}'                           
                        `,  function(err, result) {
       done(err);
        if(err) {
          return console.error('error running query', err);
        }        
         // res.json(result.rows);  
          res.send('Vehicle information ');
    });
    });
   });

    
  // router.post('/',urlencodedParser,function(req, res, next) { 
  //    // console.log(req.files);
  //        // res.json(result.rows);  
  //       res.send('Images information ');
  //  });

   
module.exports = router;
