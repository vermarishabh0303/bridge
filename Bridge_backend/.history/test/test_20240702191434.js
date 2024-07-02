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


\
exports.getQuote = async (req, res) => {
  const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;

  if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  if (isNaN(srcChainId) || isNaN(destChainId) || isNaN(amount) ||
      !fromTokenAddress.match(/^0x[a-fA-F0-9]{40}$/) ||
      !toTokenAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  console.log('Received request with parameters:', req.query);

  try {
    // Simulate some async processing (e.g., API call, database query, etc.)
    const quote = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a sample quote.");
      }, 1000); // Simulate a 1-second delay
    });

    res.status(200).json({ quote });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



describe('GET /quote', function() {
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


// describe('GET /quote', function() {
//   it('should handle very large amount values', async function() {
//     await request(app)
//       .get('/quote')
//       .query({
//         srcChainId: 1,
//         fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
//         amount: '1000000000000000000000000000', // Very large amount
//         destChainId: 56,
//         toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
//       })
//       .expect(200);
//   });

//   it('should handle very small amount values', async function() {
//     await request(app)
//       .get('/quote')
//       .query({
//         srcChainId: 1,
//         fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
//         amount: '1', // Very small amount
//         destChainId: 56,
//         toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
//       })
//       .expect(200);
//   });
// });

