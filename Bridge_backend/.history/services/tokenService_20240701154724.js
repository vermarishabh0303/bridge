const axios = require('axios');
const { API_URL } = require('../utils/api');

const fetchSupportedTokens = async () => {
    const response = await axios.get(`${API_URL}/recommendedTokens`);
    return response.data.recommendedTokens;
};

module.exports = {
    fetchSupportedTokens,
};
