process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { app, server } = require('../server');

// Configures Chai to make requests
chai.use(chaiHttp);

// Assertion type of use
const { expect } = chai;


after(done => {
  mongoose.connection.db.dropCollection('users', () => {
    mongoose.connection.close(function () {
      server.close(() => {
        done();
      });
    });
  });
});

describe('Connection to API', () => {
  it("Should connect to the API", (done) => {
    chai.request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});


describe('Auth API', () => {
  require('./auth');
});

describe('User API', () => {
  require('./users');
});