
const chai = require('chai');
const { app } = require('../server');
const mongoose = require('mongoose');
const agent = chai.request.agent(app);
const { expect } = chai;
const testData = require('./test_data/users.json');
const User = require('../models/user');
const { logout } = require('../controllers/auth_controller');
const accountRoute = '/api/account';
const userRoute = '/api/users';

let user1Id = null;
let user2Id = null;
let loggedUserId = null;


before(done => {
  mongoose.connection.db.dropCollection('users', () => {
    setUpUsers(testData, done);
  });
});

after(done => {
  agent.close();
  done();
});

describe('ADMIN Role Actions', () => {

  const admin = testData.find(user => user.role === 'admin');


  // Login as admin
  it('should login as admin', (done) => {
    authUser(admin, done);
  });

  // GET all users
  it('should return all users', (done) => {
    agent.get(`${userRoute}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(4);
        expect(res.body[0].role).to.equal('admin');
        expect(res).to.have.status(200);
        done();
      });
  });

  // GET one user
  it('should show profile of one user', (done) => {
    agent.get(`${userRoute}/${user1Id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        done();
      });
  });

  // PATCH user details
  it('should update one user profile', (done) => {
    const user1 = {
      fullName: "Gandalf the White"
    };

    agent.patch(`${userRoute}/${user1Id}`)
      .type('form')
      .send(user1)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.fullName).to.equal(user1.fullName);
        done();
      });
  });

  // DELETE user
  it('should delete one user', (done) => {
    let deletedUser = null;
    agent.delete(`${userRoute}/${user1Id}`)
      .then((res) => {
        deletedUser = res.body;
      })
      .then(() => {
        agent.get(`${userRoute}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.not.include(deletedUser);
            done();
          });
      });

  });

  // ADMIN Logout
  it('should logout', (done) => {
    logOut(done);
  });

});

describe('USER Role Actions', () => {

  const user = testData.find(user => user.email === 'andy@email');

  // Login as user
  it('should login as user', (done) => {
    authUser(user, done);
  });

  // NOT GET all users
  it('should NOT have access to all users', (done) => {
    agent.get(`${userRoute}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });

  // GET user profile
  it('should show user profile', (done) => {
    agent.get(`${userRoute}/${loggedUserId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.email).to.equal(user.email);
        done();
      });
  });

  // NOT GET other user profile
  it('should NOT show other people\'s user profile', (done) => {
    agent.get(`${userRoute}/${user2Id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
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
    .then((res) => {
      loggedUserId = res.body.user._id;
      done();
    })
    .catch(e => console.log(e));
}

function logOut(done) {
  agent.get(`${accountRoute}/logout`)
    .then(() => {
      done();
    });
}

function setUpUsers(users, done) {
  const promises = [];
  for (const user of users) {
    promises.push(User.create(user));
  }
  Promise.all(promises)
    .then((users) => {
      user1Id = users[1]._id;
      user2Id = users[2]._id;
      done();
    });
}