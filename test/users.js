// BETTER FORMAT - MORE ORGANISED IN SOME WAYS

// const chai = require('chai');
// const utilities = require('../utils/users');
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const { expect } = require('chai');

// const dbConnection = 'mongodb://localhost/curtainCo_test';

// before(done => {
//   setUpDbConnection(dbConnection, done);
// });

// after(done => {
//   mongoose.disconnect(() => done());
// });

// beforeEach(async function () {
//   const user = await setUpUser();
//   const userId = user.id;
// });

// afterEach(done => {
//   deleteData()
//     .then(res => done());
// });
// // describe('Test', () => {
// //   it("Should fail for testing", done => {
// //     expect(1).to.be.null;
// //   });
// // });

// describe('User Model Actions', () => {
//   // GET all users
//   it('getAllUsers should return all users', async (done) => {
//     const req = {
//       params: {}
//     };
//     await utilities.getAllUsers(req)
//     .end((err, res) => {
//       expect()
//       done();
//     })
//   });
// });

// function setUpDbConnection(dbURI, done) {
//   mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   },
//     (err) => {
//       if (err) {
//         console.log('Error connecting to database', err);
//         done();
//       } else {
//         console.log('Connected to database!');
//         done();
//       }
//     });
// }

// function setUpUser() {
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
//   return User.create(testUser);
// }

// function deleteData() {
//   return User.deleteMany();
// }