var express = require('express');
var router = express.Router();
var pool = require('../common/database')
 var fs = require('fs')
// var app = express()
var bodyParser = require('body-parser')
/// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ limit: '50mb', extended: false })

// create application/json parser
//var jsonParser = bodyParser.json()

//include http, fs and url module
  // var http = require('http'),
  //   fs = require('fs'),
  //   url = require('url');
//   var multer = require('multer')

//   //upload images folder
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("test");
//   cb(null, './photo/vehicle/')
// },
// filename: function (req, file, cb) {
//   cb(null,  `${file.fieldname}_${Date.now()}_${file.originalname}`)
// }
// })
// //Create an upload instance and receive a single file
// var upload = multer({ storage: storage ,limits: {
//   fileSize: 1024 * 1024 * 5
// }  })//.single('file')
  
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
  // var itemPage = 3;
  // var page = req.body.numPage;
  // var ipage = page * itemPage
  // var temp = []; 
  // var temp1 =[];
  
  var  vehicletype =  req.body.vehicletype
  // console.log(req.body);
  // return;
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
      // res.json(result.rowCount)
  //  // res.send('Searching is a Vehicle information ');
  //  for(var i = ipage ; i <= ipage + 2 ; i++){
  //      temp.push(temp1,temp[i])
  //  }
  //   console.log(temp1);
   
  });
  });
 });

/* Add a Vehicle information . */
  router.post('/createVehicle',urlencodedParser, function(req, res, next) {
        // console.log(req.body);
        // return;
     //var vehiclecode = req.body.vehiclecode;
      var vehiclenumber = req.body.vehiclenumber;
      var vehicletype = req.body.vehicletype;
      var vehiclecolor = req.body.vehiclecolor;
      var purchaseprice = ((Number(req.body.purchaseprice) == NaN) || (req.body.purchaseprice == null) ) ? 0 : req.body.purchaseprice;
      var rentalprice  = ((Number(req.body.rentalprice) == NaN ) ||(req.body.rentalprice == null))  ? 0 : req.body.rentalprice; 
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
router.get('/getVehicleStatus',function(req, res, next) {
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

    
    //upload Image
   const uploadImage = async (req, res, next) => {
    try {
      // console.log( req.body);
      // return;
      var uriParts = req.body.path.split('.');
      var fileType = uriParts[uriParts.length - 1]; //jpg
      var daytime  = req.body.daytime;
      var fileName = req.body.fileName;
     // to declare some path to store your converted image
     //   const path = './photo/vehicle/'+ Date.now()+'.png'
      // const path = './photo/vehicle/'+ "image-" + daytime + ".png"
      const path = './photo/vehicle/'+ fileName + daytime + ".png" ;
     // const imgdata =  req.body.base64image;
       const imgdata = "data:image/png;base64," + req.body.base64image;
         console.log("test " + imgdata)
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        console.log("base64Data" + imgdata)
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
 
        return res.send(path);
 
    } catch (e) {
        next(e);
    }
}
router.post('/upload', uploadImage)



// // /* test Search Vehicle information */
// router.post('/searchVehicle',urlencodedParser,function(req, res, next) {
  
//   var pageIndex =  req.body.pageIndex;
//   // var page = req.body.numPage;
//   // var ipage = page * itemPage
//   // var temp = []; 
//   // var temp1 =[];
  
//   var  vehicletype =  req.body.vehicletype
//   console.log(req.body);
//   //return;
//   pool.connect(function(err, client, done) {
//     if(err) {
//       return console.error('error fetching client from pool', err);
//     }  
//     client.query(` SELECT * FROM vehicledetails
//                     WHERE vehicletype ILIKE '%${vehicletype}%'  
//                     ORDER BY  vehiclecode ASC
//                     LIMIT 5  
//                     OFFSET '${pageIndex}' ROWS        
//                       `,  function(err, result) {
//      done(err);
//       if(err) {
//         return console.error('error running query', err);
//       }
//    //  res.json(result.rows) //
//       res.json(result)
//   //  // res.send('Searching is a Vehicle information ');
//   //  for(var i = ipage ; i <= ipage + 2 ; i++){
//   //      temp.push(temp1,temp[i])
//   //  }
//   //   console.log(temp1);

//   });
//   });
//  });

router.get('/getVehicleInfo', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    //use the client for executing the query
      client.query(`SELECT COUNT(1) FILTER (WHERE status = '0') AS countempty,
                        COUNT(1) FILTER (WHERE status = '1') AS countrepair,
                        COUNT(1) FILTER (WHERE status = '2') AS countretal,
                        SUM(rentalprice)   FILTER (WHERE status = '0') AS  sumemptyrental,
                        SUM(rentalprice)   FILTER (WHERE status = '1') AS  sumrepairrental,
                        SUM(rentalprice)   FILTER (WHERE status = '2') AS  sumretalrental,
                        SUM(purchaseprice)   FILTER (WHERE status = '0') AS  sumemptypurchase,
                        SUM(purchaseprice)   FILTER (WHERE status = '1') AS  sumrepairpurchase,
                        SUM(purchaseprice)   FILTER (WHERE status = '2') AS  sumretalpurchase
                        FROM vehicledetails
           `,  function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if(err) {
        return console.error('error running query', err);
      }
         res.json(result.rows)
     //  res.send('Vehicle information : ' + vehicle );
    });
  });

});


module.exports = router;
