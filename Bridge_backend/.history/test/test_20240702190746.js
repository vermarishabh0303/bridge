const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary

describe('GET /Tokens', function() {
  it('should return a 200 status code', async function() {
    await request(app)
      .get('/Tokens')
      .expect(200);
  });
});

describe('GET /quote', function() {
  it('should return a 200 status code', async function() {
    await request(app)
      .get('/quote')
      .query({
        srcChainId: 1,
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        amount: '500000000000000000',
        destChainId: 56,
        toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      })
      .expect(200);
  });
});
