const User = require('../models/user');
const passport = require('passport');
const { addUser } = require('../utils/users');

// TODO: validations

async function register(req, res) {
  const email = req.body.email;
  try {
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Existing Email" });
    }
    const newUser = await addUser(req);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ message: "Invalid Fields" });
  }
}

const authenticate = passport.authenticate('local', { failureFlash: true });

function login(req, res) {
  authenticate(req, res, () => {
    console.log('authenticated', req.user.email);
    console.log('session object:', req.session);
    console.log('req.user:', req.user);
    res.status(200).json({ user: req.user, sessionID: req.sessionID });
  });
}

function logout(req, res) {
  req.logout();
  console.log('logged out user');
  console.log('session object:', req.session);
  console.log('req.user:', req.user);
  res.sendStatus(204);
}

module.exports = {
  register,
  login,
  logout
};