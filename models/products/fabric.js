const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Product } = require('../product');


// TODO - validations
const Fabric = Product.discriminator('Fabric', new Schema({
  // name: { type: String },
  // colour: { type: String },
  density: { type: String },
  style: { type: String },
  size: { type: String },
  length: { type: String }
}));
// adds createdAt and updatedAt fields
// { timestamps: true });

module.exports = mongoose.model('Fabric');