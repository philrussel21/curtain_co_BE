const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UserSchema } = require('./user');
const { ProductSchema } = require('./product');
const { CollectionSchema } = require('./collection');

// TODO - validations
// TODO  - set _id from paypal's response: order_id 
const Order = new Schema({
  customer: UserSchema,
  // products: [ProductSchema],
  // collections: [CollectionSchema],
  items: { type: Array, required: true },
  // to be changed when admin process the orders?
  isProcessed: { type: Boolean, default: false },
  totalPrice: { type: Number },
  paymentData: { type: Object, required: true }
},
  { timestamps: true });

module.exports = mongoose.model('Orders', Order);