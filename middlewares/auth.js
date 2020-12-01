
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('alert', "Please log in to continue");
    res.redirect('/users/login');
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    // TODO: change redirect
    res.redirect('/');
  }
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
};