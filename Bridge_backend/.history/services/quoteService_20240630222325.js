const axios = require('axios');
const { API_URL } = require('../utils/api');

const getQuote = async ({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress }) => {
    const response = await axios.get(`${API_URL}/quote`, {
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
    getQuote,
};
