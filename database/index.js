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



module.exports = pool