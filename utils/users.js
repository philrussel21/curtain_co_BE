const User = require('../models/user');


function getAllUsers(req) {
  return User.find();
}

function getUser(req) {
  const userId = req.params.id;
  return User.findById(userId);
}

function updateUser(req) {
  const userId = req.params.id;
  return User.findByIdAndUpdate(userId, req.body, { new: true });
}


module.exports = { getAllUsers, getUser, updateUser };