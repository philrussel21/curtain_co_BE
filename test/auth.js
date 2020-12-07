process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { app, server } = require('../server');

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


after(function (done) {
  mongoose.connection.db.dropCollection('users', () => {
    mongoose.connection.close(function () {
      server.close(() => {
        done();
      });
    });
  });
});

describe('Account API', () => {
  const agent = chai.request.agent(app);


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
      password: "testpassword"
    };


    it("should NOT login with INVALID credentials", (done) => {
      chai.request(app)
        .post("/api/account")
        .type('form')
        .send(userCreds)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });


    it("should login with valid credentials", (done) => {
      userCreds.email = "testuser@email";
      agent
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

    it("should NOT login when already authenticated", (done) => {
      agent
        .post("/api/account")
        .type('form')
        .send(userCreds)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  // Logout GET route
  describe('GET User Logout', () => {
    it("should logout user", (done) => {
      agent
        .get("/api/account/logout")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });

    it("should NOT allow logout if NOT authenticated", (done) => {
      agent
        .get("/api/account/logout")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res).to.have.status(401);
          // CLOSES THE SERVER OPENED BY CHAI
          agent.close();
          done();
        });
    });
  });
});