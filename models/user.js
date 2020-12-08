const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - Validations
const User = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  role: {
    type: String,
    default: 'user'
  },
  title: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  suburb: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postcode: {
    type: Number,
    required: true
  }
},
  // adds createdAt and updatedAt attributes when saving
  // to DB
  { timestamps: true });

// User.index({'email': 1})
User.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', User);