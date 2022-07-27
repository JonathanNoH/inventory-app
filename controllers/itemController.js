const Item = require('../models/item');
const Category = require('../models/category');

const { body, ValidationResult, validationResult } = require('express-validator');
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
exports.item_list = (req, res, next) => {

  Item.find({}, 'name price')
  .sort({name : 1})
  .exec((err, list_items) => {
    if (err) {return next(err);}
    // guard
    res.render('item_list', { title: 'Items', item_list: list_items });
  });
};

//Display specific item
exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id)
  .populate('category')
    .exec((err, data) => {
      if (err) {return next(err);}
      // success
      res.render('item_detail', { title: data.name, data: data })
    });
};

//Display Item create form on GET.
exports.item_create_get = (req, res, next) => {
  
  Category.find({}, 'name')
  .sort({name : 1})
  .exec((err, categories) => {
    if (err) {return next(err)};
    res.render('item_form', { title: "Create New Item", categories });
  });
};

//Handle Item create POST
exports.item_create_post = [
  
  // Validate and sanitize
  body('name').trim().isLength({ min: 1}).escape().withMessage('Name must be included.'),
  body('description').trim().isLength({ min: 1}).escape().withMessage('Please include a description.'),
  body('price').escape(),
  body('numberInStock').escape(),
  body('category').escape(),

  //Validated
  (req, res, next) => {
    const errors = validationResult(req);

    let item = new Item(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.numberInStock || 0,
        category: req.body.category
      }
    );

    if (!errors.isEmpty()) {
      //errors rerender

      res.render('item_form', { title: 'Create New Item', item: item, errors: errors.array()});
      return;
    } else {
      //valid
      item.save((err) => {
        if(err) {return next(err)};
        //success
        res.redirect(item.url);
      });
    }
  }
];

// Display item delete on GET
exports.item_delete_get = (req, res, next) => {
  
  Item.findById(req.params.id)
  .populate('category')
  .exec((err, item) => {
    if (err) { return next(err); }
    //results
    res.render('item_delete', { title: `Delete Item`, item });
  });

};

//Handle item delete on POST
exports.item_delete_post = (req, res, next) => {
  
  Item.findByIdAndRemove(req.body.itemid, (err) => {
    if(err) {return next(err); }
    //success
    res.redirect('/inventory/items');
  });
};

//Handle item update on GET
exports.item_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: ITEM update GET');
};

//Handle item update on POST
exports.item_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: ITEM update POST');
};

