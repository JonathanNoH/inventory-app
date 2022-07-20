const Item = require('../models/item');

//Display list of all items
exports.item_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Item List');
};

//Display specific item
exports.item_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Item detail ' + req.params.id);
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

