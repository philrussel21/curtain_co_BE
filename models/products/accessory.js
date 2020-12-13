const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../product');

// TODO - validations
const Accessory = Product.discriminator('Accessory', new Schema({
  // name: { type: String },
  length: { type: String },
  automated: { type: Boolean },
  tieBack: { type: String },
  other: { type: String },
}));
// adds createdAt and updatedAt fields
// { timestamps: true });

module.exports = mongoose.model('Accessory');