

var express = require("express");
var app = express();
//app.use(express.static("public"));
app.set("view engine","js");
app.set("views","./component");
app.listen(5000);
const pg = require('pg');

var config = {
    user: 'postgres', 
    database: 'QUANLYXE', 
    password: 'Csv0202', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000, 
  };
  
  const pool = new pg.Pool(config);


  app.get("/hotgirls/:id",function(req,res){
    var id = req.params.id;
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
  
    client.query('SELECT * FROM "hotgirlscollection" WHERE "Id"=' + id ,  function(err, result) {
     
      done(err);
 
      if(err) {
        return console.error('error running query', err);
      }
      //console.log(result.rows[0].Hinh);//cot Hinh
    //  res.render("trangchu",{dangxem:id,hinh:result.rows[0].Hinh});
      //output: 1
    });
  });
 
});