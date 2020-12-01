const User = require('../models/user');


function getAllUsers(req) {
  return User.find();
}

function getUser(req) {
  const userId = req.params.id;
  return User.findById(userId);
}

module.exports = { getAllUsers, getUser };