const { getAllUsers, getUser, updateUser } = require('../utils/users');

// TODO: Fail cases and where to redirect/ what to send
// back if so

async function indexUsers(req, res) {
  const allUsers = await getAllUsers(req);
  res.status(200).json(allUsers);
}

async function showUser(req, res) {
  const user = await getUser(req);
  res.status(200).json(user);
}

async function changeUser(req, res) {
  const updatedUser = await updateUser(req);
  res.status(200).json(updatedUser);
}

module.exports = {
  indexUsers,
  showUser,
  changeUser
};