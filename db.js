const { createClient } = require('@supabase/supabase-js');
const { postgresDbConfig } = require('./config/default');
const supabase = createClient(postgresDbConfig.url, postgresDbConfig.publicAnonKey);


// Migrated to Supabase db server

// const mysql = require('mysql');
// const pool = mysql.createPool(mysqlDbConfig);
// function commonQuery(query,params) {
//   return new Promise(function (resolve, reject) {
//     pool.getConnection(function (err, connection) {
//       if (!err) {
//         connection.query(query,params, function (err, results) {
//           connection.release();
//           if (!err) {
//             resolve(results);
//           } else {
//             reject(err);
//           };
//         })
//       } else {
//         console.log("Nothing to do ", err);
//         reject(err);
//       }
//     })
//   })
// };

module.exports = { supabase };
