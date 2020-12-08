
const chai = require('chai');
const { app } = require('../server');
const agent = chai.request.agent(app);
const { expect } = chai;

after(done => {
  agent.close();
  done();
});

describe('Test', () => {
  it("Should fail for testing", done => {
    expect(null).to.be.null;
    done();
  });
});



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
