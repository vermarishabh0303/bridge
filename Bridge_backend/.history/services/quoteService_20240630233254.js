const axios = require('axios');
const { API_URL } = require('../utils/api');

const fetchQuote = async ({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress }) => {
    console.log("Fetching quote with params:", { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress });

    const response = await axios.get(`${API_URL}/quote?srcChainId`, {
        params: {
            srcChainId,
            fromTokenAddress,
            amount,
            destChainId,
            toTokenAddress
        }
    });
    return response.data;
};

module.exports = {
    fetchQuote,
};
