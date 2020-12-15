const chai = require('chai');
const { app } = require('../server');
const mongoose = require('mongoose');
const agent = chai.request.agent(app);
const { expect } = chai;
const Product = require('../models/product');
const accountRoute = '/api/account';
const productRoute = '/api/products';
const userData = require('./test_data/users.json');
const productData = require('./test_data/products.json');

let productId = null;
let productId2 = null;

const admin = userData.find(user => user.role === 'admin');
const user = userData.find(user => user.role === 'user');

const newProduct = {
  name: 'Awesome Fabric',
  colour: 'Magenta',
  category: 'Fabric',
  density: 'Thicc',
  style: 'Nice',
  size: 'Big',
  length: 'Long'
};

before(done => {
  mongoose.connection.db.dropCollection('products', () => {
    setUpProducts(productData, done);
  });
});

after(done => {
  agent.close();
  done();
});

describe('Admin Role Products Actions', () => {

  // Login as admin
  it('should login as admin', (done) => {
    authUser(admin, 'admin', done);
  });

  // Logout as admin
  it('should logout as admin', (done) => {
    logOut(done);
  });

});

function authUser(user, role, done) {
  agent.post(`${accountRoute}`)
    .type('form')
    .send({
      email: user.email,
      password: user.password
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.user.role).to.equal(role);
      done();
    });
}

function setUpProducts(products, done) {
  const promises = [];
  console.log('Product Data Init');

  for (const product of products) {
    promises.push(Product.create(product));
  }
  Promise.all(promises)
    .then((product) => {
      productId = product[0]._id;
      productId2 = product[1]._id;
      done();
    });
}

function logOut(done) {
  agent.get(`${accountRoute}/logout`)
    .then(() => {
      done();
    });
}