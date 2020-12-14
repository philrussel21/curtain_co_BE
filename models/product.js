const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO - validations
const Product = new Schema({
  name: { type: String },
  colour: { type: String },
  imgUrl: { type: String }
},
  {
    discriminatorKey: 'category',
    timestamps: true
  });

module.exports = mongoose.model('Products', Product);