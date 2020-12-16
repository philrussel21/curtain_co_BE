const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ProductSchema } = require('./product');

// TODO - validations
const Collection = new Schema({
  name: { type: String },
  description: { type: String },
  imgUrl: { type: String },
  price: { type: Number },
  track: ProductSchema,
  fabric: ProductSchema,
  accessory: ProductSchema
},
  { timestamps: true });

module.exports = mongoose.model('Collections', Collection);