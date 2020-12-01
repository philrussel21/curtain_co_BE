const User = require('../models/user');


function getAllUsers(req) {
  return User.find();
}

module.exports = { getAllUsers };