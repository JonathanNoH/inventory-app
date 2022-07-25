const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');

//Display list categories
exports.category_list = (req, res) => {
  
  Category.find({}, 'name')
  .sort({name : 1})
  .exec((err, list_categories) => {
    if(err) {return next(err);}
    // guard
    res.render('category_list', { title: 'Categories', category_list: list_categories});
  });
};

//Display category detail
exports.category_detail = (req, res) => {
  
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
  res.send('NOT IMPLEMENTED: category create get');
};

//Handle category create on POST
exports.category_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: category create post');
};

//Display category delete on GET
exports.category_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: category delete GET');
};

//Handle category delete POST
exports.category_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: category delete POST');
};

//Display category update GET
exports.category_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: category update GET');
};

//Handle category update POST
exports.category_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: category update POST');
};