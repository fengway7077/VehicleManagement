var express = require('express');
var router = express.Router();
var pool = require('../common/database')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* Get customer information listing. */
router.get('/getCustomer', function(req, res, next) {
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
      res.json(result.rows)
    //  res.send('customer information' + res.json(result));
    });
  });
});

/*Search customer information */
router.post('/searchCustomer',urlencodedParser,function(req, res, next) {
  var  firstname =  req.body.firstname
  var  lastname =  req.body.lastname
  var fullname =  lastname + firstname
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(` SELECT * FROM customer
                    WHERE firstname ILIKE '%${firstname}%'  
                      OR  lastname ILIKE '%${lastname}%'  
                      OR  fullname ILIKE '%${fullname}%'      
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

/* Update customer  */
 router.post('/editCustomer',urlencodedParser, function(req, res, next) {     
    // console.log(req.body);   
    var customercode = req.body.customercode; 
    var lastname = req.body.lastname; 
    var firstname = req.body.firstname;
    var gender = req.body.gender; //
    var birthday = req.body.birthday;   //
    var phone =  req.body.phone;
    var address = req.body.address;
    var email = req.body.email;
    var nationality = req.body.nationality;
    var flagdelete = 0 ;// req.body.flagdelete;  //
    var idcard = req.body.idcard;
    var fullname = lastname + ' '+ firstname;
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
     //use the client for executing the query
     client.query(`UPDATE customer SET  lastname = '${lastname}'  
                                      , firstname = '${firstname}' 
                                      , gender = '${gender}'
                                      , birthday  = '${birthday}'
                                      , phone = '${phone}'
                                      , address = '${address}'  
                                      , email = '${email}' 
                                      , nationality = '${nationality}' 
                                      , flagdelete = '${flagdelete}' 
                                      , idcard = '${idcard}'
                                      , fullname = '${fullname}'
                                    WHERE customercode = '${customercode}'  `,  function(err, result) {

    done(err);
   if(err) {
      return console.error('error running query', err);
   }    
     res.json(result);
     // res.send('Updating is a Customer information ');
   });
  });
});

/* Add  customer  */
router.post('/createCustomer',urlencodedParser, function(req, res, next) {
    //var customercode =  req.body.customercode; 
    var lastname = req.body.lastname; 
    var firstname = req.body.firstname;
    var gender = req.body.gender; //
    var birthday = req.body.birthday;   //
    var phone =  req.body.phone;
    var address =  req.body.address;
    var email = req.body.email;
    var nationality = req.body.nationality;
    var flagdelete = '0';//req.body.flagdelete;  //
    var idcard = req.body.idcard;
    var fullname = lastname +' '+ firstname;
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
   //use the client for executing the query
   client.query(` INSERT INTO customer ( 
                                          lastname 
                                        , firstname 
                                        , gender 
                                        , birthday  
                                        , phone 
                                        , address  
                                        , email 
                                        , nationality 
                                        , flagdelete 
                                        , idcard 
                                        , fullname
                                          )  VALUES(     
                                                      '${lastname}' 
                                                    , '${firstname}' 
                                                    , '${gender}'
                                                    , '${birthday}'
                                                    , '${phone}'
                                                    , '${address}'  
                                                    , '${email}' 
                                                    , '${nationality}'
                                                    , '${flagdelete}'  
                                                    , '${idcard}' 
                                                    , '${fullname}' 
                                                    )
                  `,  function(err, result) {

  done(err);
 if(err) {
    return console.error('error running query', err);
 }    
    res.json(result);    
    //res.send('Creating is a Customer information ');
 });
});
});

  /*Remove records from  a customer information */
  router.post('/removeCustomer',urlencodedParser,function(req, res, next) {
    var  customercode =  req.body.customercode
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }  
      client.query(` DELETE FROM  customer
                      WHERE customercode = '${customercode}'          
                        `,  function(err, result) {
       done(err);
        if(err) {
          return console.error('error running query', err);
        }
          console.log("Removing");
          res.json(result);
      // res.send('Removing is a record from customer information : ' + customercode);
    });
    });
   });

  /*Check records from  a customer information */
  router.post('/checkCustomer',function(req, res, next) { 
    var  customercode =  req.body.customercode
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }  
      client.query(` SELECT customercode ,fullname FROM  customer  WHERE customercode = '${customercode}'                           
                        `,  function(err, result) {
       done(err);
        if(err) {
          return console.error('error running query', err);
        }        
          res.json(result.rows);
      // res.send('Check is a record from customer information : ' + customercode);
    });
    });
   });

   /*Flag records from  a customer information */
  router.post('/flagCustomer',urlencodedParser,function(req, res, next) {
    var  customercode =  req.body.customercode
    var flagdelete = req.body.flagdelete
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }  
      client.query(` UPDATE customer SET flagdelete =  '${flagdelete}' 
                      WHERE customercode = '${customercode}'          
                        `,  function(err, result) {
       done(err);
        if(err) {
          return console.error('error running query', err);
        }
         // console.log("Updating Flag");
          res.json(result);
      // res.send('Flag is a record from customer information : ' + customercode);
    });
    });
   });


module.exports = router;
