const {Pool} = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "liamcoding",
  port: 5432,
  password: 'password',
  database: "sdc_overview_db"
});

pool.connect((err) => {
  if (err) {
    console.log('error connecting', err)
  }
  console.log('connection established')
  return;
});

// pool.query(`SELECT * FROM Products limit 10`, (err, res) => {
//     if(!err){
//       console.log(res.rows);
//     } else {
//       console.log(err.message);
//     }
//     pool.end
// })

module.exports.pool - pool