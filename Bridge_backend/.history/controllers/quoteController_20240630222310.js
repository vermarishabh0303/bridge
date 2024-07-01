const { getQuote } = require('../services/quoteService');

const getQuote = async (req, res) => {
    try {
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;
        const quote = await getQuote({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress });
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuote,
};
