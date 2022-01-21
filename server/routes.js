const db = require('../database/index.js');
const Axios = require('axios');

var routes = {
  getProducts: (req, res) => {
    let count = req.query.count || 5;
    db.query(`SELECT product_id, name, slogan, description, category, default_price FROM products LIMIT ${count};`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
        res.send(result.rows);
      }
    })
  },

  getProductById: (req, res) => {

    db.query('SELECT product_id, name, slogan, description, category, default_price FROM products WHERE product_id=$1',[req.params.product_id])
    .then( ({rows})  => {
      let productData = rows[0];

    db.query('SELECT name, value FROM features WHERE product_id=$1', [req.params.product_id])
    .then( ({rows})  => {
      productData.features = rows;
      res.status(200).send(productData);
    })
    .catch( (err) => {
      console.log('error in getProductById');
      res.status(400).send(err);
    });
  });
  },

  getProductStyles: (req, res) => {
    let {product_id} = req.params
    let queryString = `SELECT style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id=$1;`
    let queryArgs = [product_id]

    db.query(queryString, queryArgs)
    .then( ({rows}) => {

      let returnObj = {
        product_id: product_id,
        results: rows
      };
      let styleIds = rows.map( style => style.style_id );
      let queryString = `SELECT style_id, url, thumbnail_url FROM photos WHERE style_id = ANY($1)`;
      let queryArgs = [styleIds];
      db.query(queryString, queryArgs)
      .then( ({rows}) => {
        for (let i = 0; i < returnObj.results.length; i++) {
          returnObj.results[i].photos=[];
          for (let j = 0; j < rows.length; j++) {
            if (rows[j].style_id == returnObj.results[i].style_id) {
              returnObj.results[i].photos.push({
                thumbnail_url: rows[j].thumbnail_url,
                url: rows[j].url
              });
            }
          }
        }
        queryString = `SELECT style_id, skus_id, quantity, size FROM skus WHERE style_id = ANY($1)`;
        queryArgs = [styleIds];
        db.query(queryString, queryArgs)
        .then( ({rows}) => {
          for (let i = 0; i < returnObj.results.length; i++) {
            returnObj.results[i].skus = {};
            for (let j = 0; j < rows.length; j ++) {
              if (rows[j].style_id == returnObj.results[i].style_id) {
                returnObj.results[i].skus[rows[j].skus_id] = {
                  size: rows[j].size,
                  quantity: rows[j].quantity
                };
              }
            }
          }

          res.status(200).send(returnObj);
        })
        .catch( (err) => {
          console.log('error in getProductStyles 3', err);
          res.status(400).send(err);
        });
      })
      .catch((err) => {
        console.log('error in getProductStyles 2', err);
          res.status(400).send(err);
      });
    })
    .catch((err) => {
      console.log('error in getProductStyles 1', err);
        res.status(400).send(err);
    });

  },

  getProductRelated: (req, res) => {

    db.query('SELECT related_product_id FROM related WHERE current_product_id=$1',[req.params.product_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
        var newResult = []
        for(var i = 0; i < result.rows.length; i ++) {
          newResult.push(result.rows[i].related_product_id)
        }
        res.send(newResult);
      }
    })
  },
};

module.exports = routes;


// let {page, count, sort, product_id} = req.query;
    // if (page == null) {
    //   page = 0;
    // } else if (count == null) {
    //   count = 5;
    // } else if (sort == null) {
    //   sort = 'newest'
    // } else if (product_id == null) {
    //   res.send('Error, you must include product_id');
    //   return;
    // }

    // console.log('products: ', products)
    // var {id} = products;
    // console.log('id: ', id);



