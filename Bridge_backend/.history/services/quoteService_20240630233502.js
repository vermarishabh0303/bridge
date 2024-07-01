const axios = require('axios');
const { API_URL } = require('../utils/api');

const fetchQuote = async ({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress }) => {
    console.log("Fetching quote with params:", { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress });

    const response = await axios.get(`${API_URL}/quote?srcChainId=1&fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&amount=500000000000000000&destChainId=56&toTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`);
   console.log({response})
    // return response.data;
};

module.exports = {
    fetchQuote,
};
