const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');

//index
exports.index = (req, res) => {

  async.parallel({
    category_count(callback) {
      Category.countDocuments({}, callback);
    },
    item_count(callback) {
      Item.countDocuments({}, callback);
    }
  }, (err, results) => {
    res.render('index', { title: 'Inventory Home', error: err, data: results });
  });
};

//Display list of all items
exports.item_list = (req, res) => {

  Item.find({}, 'name price')
  .sort({name : 1})
  .exec((err, list_items) => {
    if (err) {return next(err);}
    // guard
    res.render('item_list', { title: 'Items', item_list: list_items });
  });
};

//Display specific item
exports.item_detail = (req, res) => {
  Item.findById(req.params.id)
  .populate('category')
    .exec((err, data) => {
      if (err) {return next(err);}
      // success
      res.render('item_detail', { title: data.name, data: data })
    });
};

//Display Item create form on GET.
exports.item_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item create GET');
};

//Handle Item create POST
exports.item_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item create POST');
};

// Display item delete on GET
exports.item_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item delete GET');
};

//Handle item delete on POST
exports.item_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item delete POST');
};

//Handle item update on GET
exports.item_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: ITEM update GET');
};

//Handle item update on POST
exports.item_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: ITEM update POST');
};

