const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Product } = require('../product');


// TODO - validations
const Track = Product.discriminator('Track', new Schema({
  // name: { type: String },
  type: { type: String },
  single: { type: Boolean },
  // colour: { type: String },
  finialStyle: { type: String },
  finialColour: { type: String },
  location: { type: String }
}));
// adds createdAt and updatedAt fields
// { timestamps: true });

module.exports = mongoose.model('Track');