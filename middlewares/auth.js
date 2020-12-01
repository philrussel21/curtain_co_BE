
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

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
};