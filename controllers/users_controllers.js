const { getAllUsers, getUser } = require('../utils/users');

async function indexUsers(req, res) {
  const allUsers = await getAllUsers(req);
  res.status(200).json(allUsers);
}

async function showUser(req, res) {
  const user = await getUser(req);
  res.status(200).json(user);
}

module.exports = {
  indexUsers
};