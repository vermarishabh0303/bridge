const { fetchSupportedTokens } = require('../services/tokenService');

const getTokens = async (req, res) => {
    try {
        const tokens = await fetchSupportedTokens();
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTokens,
};
