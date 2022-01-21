const express = require('express');
const path = require('path');
const routes = require('./routes.js');

var app = express();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/products', routes.getProducts);
app.get('/products/:product_id', routes.getProductById);
app.get('/products/:product_id/styles', routes.getProductStyles);
app.get('/products/:product_id/related', routes.getProductRelated);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening on port 3000');
  }
});



// require("newrelic");
// const express = require("express");
// const app = express();
// const port = 3000;
// const path = require("path");
// const database = require("./database");

// app.use(express.static("dist"));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
// let timeId = 1;
// let timeIdEnd = 1;

// app.get("/products/:id", (req, res) => {
//   let returnObject = {};
//   let product_id = req.params.id;
//   Promise.all([
//     database.productQuery(product_id).then((results) => {
//       returnObject.id = results[0].id;
//       returnObject.name = results[0].name;
//       returnObject.slogan = results[0].slogan;
//       returnObject.description = results[0].description;
//       returnObject.category = results[0].category;
//       returnObject.default_price = results[0].default_price;
//     }),
//     database.featuresQuery(product_id).then((results) => {
//       returnObject.features = results;
//     }),
//   ])
//     .then(() => {
//       console.log(returnObject);
//       res.send(returnObject);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

// app.get("/products/:id/related", (req, res) => {
//   let product_id = req.params.id;
//   database
//     .getRelated(product_id)
//     .then((results) => {
//       var mappedResults = results.map((relatedProduct) => {
//         return relatedProduct.related_product_id;
//       });
//       res.send(mappedResults);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

// app.get("/products/:id/styles", (req, res) => {
//   console.time("a");
//   let product_id = req.params.id;
//   let returnObject = {};
//   database
//     .stylesQuery(product_id)
//     .then((results) => {
//       returnObject.product_id = product_id;
//       returnObject.results = results;
//       return returnObject;
//     })
//     .then((returnObject) => {
//       return Promise.all(
//         returnObject.results.map((item) => {
//           return database
//             .getPhotos(item.style_id)
//             .then((photos) => {
//               item.photos = photos;
//               return item;
//             })
//             .then(() => {
//               return database.getSkus(item.style_id).then((skus) => {
//                 item.skus = {};
//                 skus.map((sku) => {
//                   item.skus[sku.size] = sku.quantity;
//                 });
//                 return item;
//               });
//             })
//             .then(() => {
//               if (item.sale_price === "null") {
//                 item.sale_price = "0";
//               }
//               return item;
//             });
//         })
//       ).then(() => {
//         console.timeEnd("a");
//         res.send(returnObject);
//       });
//     })

//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

// // app.get("/hello", (req, res) => {
// //   var randomFunc = function () {
// //     return 3 + 4;
// //   };
// //   console.log("hello");
// //   console.timeEnd("a");
// //   res.send("abac");
// // });

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );