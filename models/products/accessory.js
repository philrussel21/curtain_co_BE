const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - validations
const Accessory = new Schema({
  name: { type: String },
  length: { type: String },
  automated: { type: Boolean },
  tieBack: { type: String },
  accessory: { type: String },
},
  // adds createdAt and updatedAt fields
  { timestamps: true });

module.exports = mongoose.model('Accessories', Accessory);