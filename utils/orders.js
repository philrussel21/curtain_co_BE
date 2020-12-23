const Order = require('../models/order');

function getAllOrders() {
  return Order.find();
  // return Order.find().populate('customer');
}

function addOrder(req) {
  return Order.create(req.body);
}

function getOrder(req) {
  const orderId = req.params.id;
  // return Order.findById(orderId).populate('customer');
  return Order.findById(orderId);
}

function updateOrder(req) {
  const orderId = req.params.id;
  return Order.findByIdAndUpdate(orderId, req.body, { new: true });
}

// will not create a removeOrder route for taxing purposes?

module.exports = {
  getAllOrders,
  addOrder,
  getOrder,
  updateOrder
};