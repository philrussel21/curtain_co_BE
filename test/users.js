
const chai = require('chai');
const { app } = require('../server');
const mongoose = require('mongoose');
const agent = chai.request.agent(app);
const { expect } = chai;
const testData = require('./data.json');
const User = require('../models/user');
const accountRoute = '/api/account';
const userRoute = '/api/users';


const admin = testData.find(user => user.role === 'admin');

before(done => {
  mongoose.connection.db.dropCollection('users', () => {
    setUpUsers(testData, done);
  });
});

after(done => {
  agent.close();
  done();
});

describe('ADMIN Actions', () => {
  // Login as admin
  it('should login as admin', (done) => {
    authUser(admin, done);
  });

  // GET all users
  it('should return all users', (done) => {
    agent.get("/api/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(3);
        expect(res.body[0].role).to.equal('admin');
        expect(res).to.have.status(200);
        done();
      });
  });
});


// function setUpAdmin(user, done) {
//   const testUser = {};
//   testUser.email = 'bilbo@baggins';
//   testUser.password = 'onering';
//   testUser.title = 'Dr.';
//   testUser.fullName = 'Bilbo Baggins';
//   testUser.phone = 123456789;
//   testUser.companyName = 'Precious';
//   testUser.address1 = '21 Hobbitown';
//   testUser.suburb = 'MiddleEarth';
//   testUser.state = 'Queensland';
//   testUser.postcode = 1234;
//   testUser.role = 'admin';

//   chai.request(app)
//     .post("/api/account/register")
//     .type('form')
//     .send(testUser)
//     .then(() => {
//       return agent.post('/api/account')
//         .type('form')
//         .send({
//           email: testUser.email,
//           password: testUser.password
//         })
//         .then(() => {
//           done();
//         });
//     })
//     .catch(e => {
//       console.log(e);
//     });

// }

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

function setUpUsers(users, done) {
  const promises = [];
  for (const user of users) {
    promises.push(User.create(user));
  }
  Promise.all(promises)
    .then(() => {
      done();
    });
}