const { getAllUsers, getUser, updateUser, removeUser } = require('../utils/users');

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

async function deleteUser(req, res) {
  // TODO - returns the removed user document
  const removed = await removeUser(req);
  // TODO - potentially redirect
  // res.sendStatus(204);
  res.status(202).send(removed);
}


module.exports = {
  indexUsers,
  showUser,
  changeUser,
  deleteUser
};