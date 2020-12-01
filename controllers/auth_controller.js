const User = require('../models/user');
const passport = require('passport');

// TODO: validations and checks for existing users
async function register(req, res) {
  const newUser = await User.create(req.body);
  res.status(200).json({ message: newUser });
}

const authenticate = passport.authenticate('local', { failureFlash: true });

function login(req, res) {
  authenticate(req, res, () => {
    console.log('authenticated', req.user.username);
    console.log('session object:', req.session);
    console.log('req.user:', req.user);
    res.status(200);
    res.json({ user: req.user, sessionID: req.sessionID });
  });
}

module.exports = {
  register,
  login
};