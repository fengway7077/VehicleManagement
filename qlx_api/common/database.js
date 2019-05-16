
var config = {
    user: 'postgres', 
    database: 'VehicleManagement', 
    password: 'postgres', 
    host: 'localhost', 
    port: 5433, 
    max: 10, 
    idleTimeoutMillis: 30000, 
  };
  const pg = require('pg');
  const pool = new pg.Pool(config);

  module.exports = pool;