const chai = require('chai');
const { app } = require('../server');
const mongoose = require('mongoose');
const agent = chai.request.agent(app);
const { expect } = chai;
const Consult = require('../models/consult');
const { logout } = require('../controllers/auth_controller');
const accountRoute = '/api/account';
const consultRoute = '/api/consults';
const [admin, user] = require('./test_data/users.json');
const consultData = require('./test_data/consults.json');

let consultId = null;

const newConsult = {
  email: 'chandler@email',
  title: 'Ms.',
  fullName: 'Chanandler Bong',
  phone: '1234567899',
  address1: '126 Central Perk',
  suburb: 'New York',
  state: 'NSW',
  postcode: '1234',
  message: 'Could this test, BE any easier.'
};

before(done => {
  mongoose.connection.db.dropCollection('consults', () => {
    setUpConsults(consultData, done);
  });
});

after(done => {
  agent.close();
  done();
});

describe('Admin Role Consults Actions', () => {

  // Login as admin
  it('should login as admin', (done) => {
    authUser(admin, done);
  });

  // GET all consults
  it('should get all consults as admin', (done) => {
    agent.get(`${consultRoute}/`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an('array');
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(4);
        done();
      });
  });

  // GET one consult
  it('should get one particular consult using ID', (done) => {
    agent.get(`${consultRoute}/${consultId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.email).to.equal('michael@email');
        done();
      });
  });


});

function authUser(user, done) {
  agent.post(`${accountRoute}`)
    .type('form')
    .send({
      email: user.email,
      password: user.password
    })
    .then(() => {
      done();
    })
    .catch(e => console.log(e));
}

function setUpConsults(consults, done) {
  const promises = [];
  console.log('Consult Data Init');

  for (const consult of consults) {
    promises.push(Consult.create(consult));
  }
  Promise.all(promises)
    .then((consults) => {
      consultId = consults[0]._id;
      done();
    });
}