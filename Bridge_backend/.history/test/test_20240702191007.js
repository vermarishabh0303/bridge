const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary

describe('GET /Tokens', function() {
  it('should return a 200 status code', function(done) {
    request(app)
      .get('/Tokens')
      .expect(200, done);
  });
});

describe('GET /quote', function() {
  this.timeout(15000);

  it('should return a 200 status code', function(done) {
    request(app)
      .get('/quote')
      .query({
        srcChainId: 1,
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        amount: '500000000000000000',
        destChainId: 56,
        toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      })
      .expect(200, done);
  });
});


describe('GET /quote', function() {
  it('should return a 400 status code when parameters are missing', async function() {
    await request(app)
      .get('/quote')
      .expect(400);
  });

  it('should return a 400 status code when some parameters are missing', async function() {
    await request(app)
      .get('/quote')
      .query({
        srcChainId: 1,
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        amount: '500000000000000000'
      })
      .expect(400);
  });
});


describe('GET /quote', function() {
  it('should return a 400 status code when parameters have invalid values', async function() {
    await request(app)
      .get('/quote')
      .query({
        srcChainId: 'invalid',
        fromTokenAddress: 'invalid',
        amount: 'invalid',
        destChainId: 'invalid',
        toTokenAddress: 'invalid'
      })
      .expect(400);
  });
});

