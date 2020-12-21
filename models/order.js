const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UserSchema } = require('./user');
const { ProductSchema } = require('./product');
const { CollectionSchema } = require('./collection');

// TODO - validations
// TODO  - set _id from paypal's response: order_id 
const Order = new Schema({
  customer: UserSchema,
  products: [ProductSchema],
  collections: [CollectionSchema],
  isProcessed: { type: Boolean, default: false }
},
  { timestamps: true });

module.exports = mongoose.model('Orders', Order);