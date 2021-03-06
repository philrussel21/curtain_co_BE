const { isAdmin, isOwner } = require('../utils/auth');

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Must be authenticated to access" });
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Must NOT be authenticated to access" });
  }
}

function checkAdmin(req, res, next) {
  if (isAdmin(req.user)) return next();
  return res.status(401).json({ message: "Unauthorized User. Admin Access only" });
}

function checkAdminOrOwner(req, res, next) {
  if (isAdmin(req.user)) return next();
  if (isOwner(req.user, req.params.id)) return next();
  return res.status(401).json({ message: "Unauthorized User. You are not allowed to access this route." });
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdmin,
  checkAdminOrOwner
};