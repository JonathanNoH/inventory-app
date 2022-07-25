const express = require('express');
const router = express.Router();

// get controllers
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

/// ITEM ROUTES ///

//GET Inv home
router.get('/', item_controller.index);

// GET item list
router.get('/items', item_controller.item_list);

// GET item create
router.get('/item/create', item_controller.item_create_get);

// POST item create
router.post('/item/create', item_controller.item_create_post);

// GET item detail
router.get('/item/:id', item_controller.item_detail);

// GET item delete
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST item delete
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET item update
router.get('/item/:id/update', item_controller.item_update_get);

// POST item update
router.post('/item/:id/update', item_controller.item_update_post);

/// CATEGORY ROUTES ///

// GET category list
router.get('/categories', category_controller.category_list);

// GET category create
router.get('/category/create', category_controller.category_create_get);

// POST category create
router.post('/category/create', category_controller.category_create_post);

// GET category detail
router.get('/category/:id', category_controller.category_detail);

// GET category delete
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST category delete
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET category update
router.get('/category/:id/update', category_controller.category_update_get);

// POST category update
router.post('/category/:id/update', category_controller.category_update_post);

module.exports = router;