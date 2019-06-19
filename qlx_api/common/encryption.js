// // Nodejs encryption with GCM
// // Does not work with nodejs v0.10.31
// // Part of https://github.com/chris-rock/node-crypto-examples

//  var crypto = require('crypto'),
//   algorithm = 'aes-256-gcm',
//   password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY', 
//   // password =  '01d1ba20575c4d7ae887152eefe9aaa4', //md5
//   // do not use a global iv for production, 
//   // generate a new one for each encryption
//  　 iv = '60iP0h6vJoEa'
//  　//iv = 'VIỆTNAM@日本'

// function encrypt(text) {
//   var cipher = crypto.createCipheriv(algorithm, password, iv)
//   var encrypted = cipher.update(text, 'utf8', 'hex')
//   encrypted += cipher.final('hex');
//   var tag = cipher.getAuthTag();
//   return {
//     content: encrypted,
//     tag: tag
//   };
// }

// function decrypt(encrypted) {
//   var decipher = crypto.createDecipheriv(algorithm, password, iv)
//   decipher.setAuthTag(encrypted.tag);
//   var dec = decipher.update(encrypted.content, 'hex', 'utf8')
//   dec += decipher.final('utf8');
//   return dec;
// }

 //var hw = encrypt("text")
 // outputs hello world
//console.log(decrypt(hw));
//var hash = crypto.createHash('sha256').update("Cube2335").digest('base64');
 //console.log( hash);

// var crypto = require('crypto');

//  function encrypt(text) {
//     var crypto = require('crypto');
//     var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
//     var enc = mykey.update('abc', 'utf8', 'hex')
//     enc += mykey.update.final('hex');
//     console.log(enc); //34feb914c099df25794bf9ccb85bea72
//     return  enc;
//  }

// function decrypt(encrypted) {
//     var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
//     var dec = mykey.update(encrypted, 'hex', 'utf8')
//     dec += mykey.update.final('utf8');
//     console.log(dec); //abc
//     return  dec;
// }

// var hw = encrypt("Csv0202")
//  console.log(hw);
//  var dec = decrypt("")
//  console.log(dec);