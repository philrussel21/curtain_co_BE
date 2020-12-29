const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - validations
const Collection = new Schema({
  name: { type: String },
  description: { type: String },
  imgUrl: { type: String },
  price: { type: Number },
  track: { type: Schema.Types.ObjectId, ref: 'Products' },
  fabric: { type: Schema.Types.ObjectId, ref: 'Products' },
  accessory: { type: Schema.Types.ObjectId, ref: 'Products' }
},
  { timestamps: true });

module.exports = {
  Collection: mongoose.model('Collections', Collection),
  CollectionSchema: Collection
};