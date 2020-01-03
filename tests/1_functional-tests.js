/*
*       
*       To run the tests, open the terminal with [Ctrl + `] (backtick)
*       and run the command `npm run test`
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('Routing Tests', () => {
    
    suite('GET /api/timestamp/(:date or :timestamp) => timestamp object', () => {
      
      test('Handles a valid date and returns the correct Unix timestamp', done => {
       chai.request(server)
        .get('/api/timestamp/2016-12-25')
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.strictEqual(res.body.unix, 1482624000000);
          done();
        });
      });

      test('Handles a valid date and returns the correct UTC string', done => {
        chai.request(server)
         .get('/api/timestamp/2016-12-25')
         .end((err, res) => {
           assert.strictEqual(res.status, 200);
           assert.strictEqual(res.body.utc, 'Sun, 25 Dec 2016 00:00:00 GMT');
           done();
         });
       });

       test('Handles a valid Unix date and returns the correct Unix timestamp', done => {
        chai.request(server)
         .get('/api/timestamp/1482624000000')
         .end((err, res) => {
           assert.strictEqual(res.status, 200);
           assert.strictEqual(res.body.unix, 1482624000000);
           done();
         });
       });

       test('Returns the expected error message for an invalid date', done => {
        chai.request(server)
         .get('/api/timestamp/this-is-not-a-date')
         .end((err, res) => {
           assert.strictEqual(res.status, 200);
           assert.strictEqual(res.body.error.toLowerCase(), 'invalid date');
           done();
         });
       });

       test('Handles an empty date parameter and returns the current time in Unix format', done => {
        chai.request(server)
         .get('/api/timestamp/')
         .end((err, res) => {
           assert.strictEqual(res.status, 200);
           assert.approximately(res.body.unix, Date.now(), 5000);
           done();
         });
       });

       test('Handles an empty date parameter and returns the current time in UTC format', done => {
        chai.request(server)
         .get('/api/timestamp/')
         .end((err, res) => {
           const testDate = new Date(res.body.utc).getTime();
           assert.strictEqual(res.status, 200);
           assert.approximately(testDate, Date.now(), 5000);
           done();
         });
       });
      
    });

  });

});
