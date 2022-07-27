const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');
const { body, validationResult } = require('express-validator');

//Display list categories
exports.category_list = (req, res, next) => {
  
  Category.find({}, 'name')
  .sort({name : 1})
  .exec((err, list_categories) => {
    if(err) {return next(err);}
    // guard
    res.render('category_list', { title: 'Categories', category_list: list_categories});
  });
};

//Display category detail
exports.category_detail = (req, res, next) => {
  
  async.parallel({
    category(callback) {
      Category.findById(req.params.id)
        .exec(callback);
    },
    category_items(callback) {
      Item.find({ 'category': req.params.id })
        .exec(callback)
    },
  }, (err, results) => {
    if (err) { return next(err) };
    if (results.category==null) {
      let err = new Error('Category not found');
      err.status = 404;
      return next(err);
    };
    //successful
    res.render('category_detail', { title: 'Category Detail', category: results.category, category_items: results.category_items});
  });
};

//Display category create form on GET
exports.category_create_get = (req, res) => {
  res.render('category_form', { title: 'Create Category '});
};

//Handle category create on POST
exports.category_create_post = [
  
  //Validate and sanitize the name field.
  body('name', 'Category name required').trim().isLength({ min: 1}).escape(),

  // Process req after validation and sanitization.
  (req, res, next) => {

    // Extract validation errors from request
    const errors = validationResult(req);

    let category = new Category(
      { name: req.body.name }
    );

    if(!errors.isEmpty()) {
      //rerender form on errors
      res.render('category_form', { title: 'Create Category', category: category, errors: errors.array()});
      return;
    } else {
      // Valid data
      // Check preexisting category
      Category.findOne({ 'name': req.body.name})
        .exec( (err, found_category) => {
          if (err) { return next(err)};

          if(found_category) {
            // Category exists, redirect to category detail page
            res.redirect(found_category.url);
          } else {

            category.save((err) => {
              if (err) { return next(err) };
              // Category saved
              res.redirect(category.url);
            });

          }
        });
    }
  }

];

//Display category delete on GET
exports.category_delete_get = (req, res, next) => {
  
  async.parallel({
    category(callback) {
      Category.findById(req.params.id).exec(callback)
    },
    category_items(callback) {
      Item.find({ 'category': req.params.id}).exec(callback)
    },
  }, (err, results) => {
    if (err) { return next(err); }
    if (results.category===null) {
      // No results
      res.redirect('/inventory/categories');
    }
    //results
    res.render('category_delete', { title: 'Delete Category', category: results.category, category_items: results.category_items });
  });

};

//Handle category delete POST
exports.category_delete_post = (req, res, next) => {
  
  async.parallel({
    category(callback) {
      Category.findById(req.body.categoryid).exec(callback)
    },
    category_items(callback) {
      Item.find({ 'category': req.body.categoryid}).exec(callback)
    },
  }, (err, results) => {
    if (err) { return next(err); }
    // results
    if (results.category_items.length > 0) {
      //category still has items. render get route
      res.render('category_delete', { title: 'Delete Category', category: results.category, category_items: results.category_items });
      return;
    } else {
      // Category has no items. Delete category redirect to category list
      Category.findByIdAndRemove(req.body.categoryid, (err) => {
        if(err) { return next(err); }
        //success
        res.redirect('/inventory/categories')
      });
    }
  });
};

//Display category update GET
exports.category_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: category update GET');
};

//Handle category update POST
exports.category_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: category update POST');
};