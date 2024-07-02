const { fetchQuote } = require('../services/quoteService');

// const getQuote = async (req, res) => {
//     try {
//         const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;

//         if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
//             return res.status(400).json({ error: "Missing required query parameters" });
//         }

//         const quote = await fetchQuote({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress });
//         res.json(quote);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     getQuote,
// };




// controllers/quoteController.js
exports.getQuote = async (req, res) => {
    const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;
  
    // Validate that all parameters are present
    if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }
  
    // Validate that parameters are in correct format
    if (isNaN(srcChainId) || isNaN(destChainId) || isNaN(amount) ||
        !/^0x[a-fA-F0-9]{40}$/.test(fromTokenAddress) ||
        !/^0x[a-fA-F0-9]{40}$/.test(toTokenAddress)) {
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
  