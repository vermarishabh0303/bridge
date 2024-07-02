const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); 

describe('GET /Tokens', function() {
  it('should return a 200 status code', async function() {
    await request(app)
      .get('/Tokens')
      .expect(200);
  });
});

describe('GET /quote', function() {
  this.timeout(10000); // Increase timeout to 10 seconds

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

  it('should return a response with the correct structure', async function() {
    const response = await request(app)
      .get('/quote')
      .query({
        srcChainId: 1,
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        amount: '500000000000000000',
        destChainId: 56,
        toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('quote');
  });

  it('should return a 200 status code for different valid parameter combinations', async function() {
    await request(app)
      .get('/quote')
      .query({
        srcChainId: 2,
        fromTokenAddress: '0x1234567890abcdef1234567890abcdef12345678',
        amount: '1000000000000000000',
        destChainId: 100,
        toTokenAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdef'
      })
      .expect(200);
  });
});
