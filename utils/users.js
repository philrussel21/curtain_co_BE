const User = require('../models/user');


function getAllUsers(req) {
  return User.find();
}

function getUser(req) {
  const userEmail = req.params.email;
  return User.findOne({ email: userEmail });
}


module.exports = { getAllUsers, getUser };