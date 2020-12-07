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
  it("Should connect to the API", (done) => {
    chai.request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});


describe('Account API', () => {
  // Register POST route
  describe('POST Register Information', () => {
    const testData = {
      "email": "testuser@email",
      "password": "testpassword",
      "title": "Ms.",
      "fullName": "Michael Scarn",
      "phone": 123456789,
      "companyName": "Michael Scott Paper Company",
      "address1": "123 Next Block Street",
      "suburb": "Sunnybank",
      "state": "Queensland",
      "postcode": 4009
    };

    it('should register new user with valid credentials', (done) => {
      chai.request(app)
        .post("/api/account/register")
        .type('form')
        .send(testData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res).to.have.status(201);
          done();
        });
    });

    it("should NOT register when EXISTING user", (done) => {
      chai.request(app)
        .post("/api/account/register")
        .type('form')
        .send(testData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should NOT register with INVALID fields", (done) => {
      delete testData.email;
      chai.request(app)
        .post("/api/account/register")
        .type('form')
        .send(testData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // Login POST route
  describe('POST Login Information', () => {
    const userCreds = {
      email: "testWrong@email",
      password: "password"
    };

    it("should NOT login with INVALID credentials", (done) => {
      chai.request(app)
        .post("/api/account")
        .type('form')
        .send(userCreds)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
        });
    });


    it("should login in with valid credentials", (done) => {
      userCreds.email = "test@email";
      chai.request(app)
        .post("/api/account")
        .type('form')
        .send(userCreds)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});