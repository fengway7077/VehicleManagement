var express = require('express');
var router = express.Router();
var pool = require('../common/database')
var bodyParser = require('body-parser')
var crypto = require('crypto')
/// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ limit: '50mb', extended: false })
//var encrypt = require('../common/encryption')
//* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/getUser',urlencodedParser,function(req, res, next) {
  var accountname =  req.body.accountname
  var password =  req.body.password
  var hashPass = crypto.createHash('sha256').update(password).digest('base64'); //sha256 is not  decrypt
   console.log(hashPass);
  // console.log(req.body);
  // return;
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }  
    client.query(`   SELECT * FROM account  WHERE accountname = '${accountname}' AND   password = '${hashPass}'  `,  function(err, result) {
     done(err);
      if(err) {
        return console.error('error running query', err);
      }
      res.json(result);
  });
  });
 });

module.exports = router;
