const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema
const ItemSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0.01},
    numberInStock: {type: Number, required: true, min: 0},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  }
);

// URL virtual
ItemSchema
.virtual('url')
.get(function () {
  return '/inventory/item/' + this.id;
});

module.exports = mongoose.model('Item', ItemSchema);