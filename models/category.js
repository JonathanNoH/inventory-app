const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema
const CategorySchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
  }
);

//Url virtual
CategorySchema
.virtual('url')
.get(function () {
  return '/inventory/category/' + this.id;
});

module.exports = mongoose.model('Category', CategorySchema);