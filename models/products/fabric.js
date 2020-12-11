const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - validations
const Fabric = new Schema({
  name: { type: String },
  colour: { type: String },
  density: { type: String },
  style: { type: String },
  size: { type: String },
  length: { type: String }
},
  // adds createdAt and updatedAt fields
  { timestamps: true });

module.exports = mongoose.model('Fabrics', Fabric);