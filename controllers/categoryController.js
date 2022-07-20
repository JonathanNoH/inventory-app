const Category = require('../models/category');

//Display list categories
exports.category_list = (req, res) => {
  res.send('NOT IMPLEMENTED: category list');
};

//Display category detail
exports.category_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: category detail' + req.params.id);
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