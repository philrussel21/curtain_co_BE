process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');

// Configures Chai to make requests
chai.use(chaiHttp);

// Assertion type of use
const expect = chai.expect;


// describe('Test', () => {
//   it("Should fail for testing", done => {
//     expect(1).to.be.null;
//   });
// });

describe('Connection to API', () => {
  it("Should connect to the API", done => {
    chai.request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Account API', () => {
  describe('POST Login Information', () => {
    it("should login in with valid credentials", (done) => {
      chai.request(app)
        .post("/api/account")
        .type('form')
        .send({
          "email": "test@email",
          "password": "password"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});