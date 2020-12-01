const User = require('../models/user');

// TODO: validations and checks for existing users
async function register(req, res) {
  const newUser = await User.create(req.body);
  res.status(200).json({ message: newUser });
}

async function login(req, res) {
}

module.exports = {
  register
};