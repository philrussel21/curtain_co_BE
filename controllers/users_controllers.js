const { getAllUsers } = require('../utils/users');

async function indexUsers(req, res) {
  const allUsers = await getAllUsers(req);
  res.status(200).send(allUsers);
}

module.exports = {
  indexUsers
};