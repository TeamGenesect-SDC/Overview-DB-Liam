const {Pool} = require('pg');
const Pass = require('../config.js')

const pool = new Pool({
  host: "ec2-3-82-232-212.compute-1.amazonaws.com",
  user: "liam2",
  port: 5432,
  password: Pass,
  database: "postgres"
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

module.exports = pool