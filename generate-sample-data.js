#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category');
var Item = require('./models/item');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];

function itemCreate(name, description, price, numberInStock, category, cb) {
  itemdetail = {
    name: name,
    description: description,
    price: price,
    numberInStock: numberInStock,
    category: category,
  }
  
  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item);
  }  );
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + Category);
    categories.push(category)
    cb(null, category);
  }   );
}

function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Clothing', callback);
        },
        function(callback) {
          categoryCreate('Gear', callback);
        },
        ],
        // optional callback
        cb);
}

function createItems(cb) {
  async.series([
    function(callback) {
      itemCreate('LTT Northen Lights Desk Pad', 'The LTT Northern Lights desk pad features a dynamic and colorful design on the left, and a clear mousing area on the right.', 29.99, 100, categories[1], callback);
    },
    function(callback) {
      itemCreate('Insulated Water Bottle', 'Show off your inner techie in style with the LTT vacuum-insulated water bottle - now available in 10 additional color combinations!', 29.99, 75, categories[1], callback);
    },
    function(callback) {
      itemCreate('WAN Hoodie', 'This super comfy zip-up hoodie features 1 Kanga pocket and 7 additional pockets..', 89.99, 10, categories[0], callback);
    },
    function(callback) {
      itemCreate('Stealth Sweatpants', 'Designed with the same fabric as our blank hoodies, our Stealth Sweatpants are here!', 49.99, 46, categories[0], callback);
    },
  ],
  // optional callback
  cb);
}


async.series([
    createCategories,
    createItems,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+ items); 
    }
    // All done, disconnect from database
    mongoose.connection.close();
});