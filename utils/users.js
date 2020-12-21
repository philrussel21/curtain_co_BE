const { User } = require('../models/user');


function getAllUsers(req) {
  return User.find();
}

function getUser(req) {
  const userId = req.params.id;
  return User.findById(userId);
}

function addUser(req) {
  return User.create(req.body);
}

function updateUser(req) {
  const userId = req.params.id;
  return User.findByIdAndUpdate(userId, req.body, { new: true });
}

function removeUser(req) {
  const userId = req.params.id;
  return User.findByIdAndDelete(userId);
}

function getUserByEmail(req) {
  const userEmail = req.body.email;
  return User.findOne({ email: userEmail });
}


module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser, getUserByEmail };