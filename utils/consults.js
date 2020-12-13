const Consult = require('../models/consult');

function getAllConsults(req) {
  return Consult.find();
}

function addConsult(req) {
  const newConsult = req.body;
  return Consult.create(newConsult);
}

function getConsult(req) {
  const consultId = req.params.id;
  return Consult.findById(consultId);
}

function removeConsult(req) {
  const consultId = req.params.id;
  return Consult.findByIdAndDelete(consultId);
}

module.exports = {
  getAllConsults,
  addConsult,
  getConsult,
  removeConsult
};