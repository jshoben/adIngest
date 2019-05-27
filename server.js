const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const clicksumRoutes = express.Router();
const PORT = 4000;

let Clicksum = require('./clicksum.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/clicksums', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
   console.log("MongoDB database connection successfully established.");
});

//route for retrieving all clicksums
clicksumRoutes.route('/').get(function(req, res) {
   Clicksum.find(function(err, clicksums) {
      if (err) {
         console.log(err);
      } else {
         res.json(clicksums);
      }
   });
});

clicksumRoutes.route('/:sourceName/:productName/:dateIngested').get(function(req, res) {
   Clicksum.find({ sourceName : req.params.sourceName, productName : req.params.productName, dateIngested : req.params.dateIngested }, function(err, clicksum) {
      if (err) {
         console.log(err);
      } else {
         res.json( { "clicksPerProductGivenSourceAndDate" : clicksum.totalClicks } );
         res.json("clicksum for specific product with source and date (at first- 11 other metrics to include");
      }
   });
});

/*
clicksumRoutes.route('/ingest').post(function(req, res) {
   Clicksum.insertMany(req.body, function(error, docs) {
      if (err) {
         console.log(err);
      } else {
         res.json(docs);
      }
   });
});
*/

clicksumRoutes.route('/ingest').post(function(req, res) {
   let clicksum = new Clicksum(req.body);

   clicksum.save(function (err, clicksum) {
      if (err) return console.error(err);
   });
});

app.use('/clicksums', clicksumRoutes);

app.listen(PORT, function() {
   console.log("Server is running on Port: " + PORT);
});