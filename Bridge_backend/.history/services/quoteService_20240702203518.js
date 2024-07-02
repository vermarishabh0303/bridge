const axios = require('axios');
const { API_URL } = require('../utils/api');

const fetchQuote = async ({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress }) => {
    try {
        const response = await axios.get(`/quote?srcChainId=${srcChainId}&fromTokenAddress=${fromTokenAddress}&amount=${amount}&destChainId=${destChainId}&toTokenAddress=${toTokenAddress}`);
        return response.data;
    } catch (error) {
        console.log(error)
    } 
};

module.exports = {
    fetchQuote,
};
