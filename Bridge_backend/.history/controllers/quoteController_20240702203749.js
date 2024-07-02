const { fetchQuote } = require('../services/quoteService');

const getQuote = async (req, res) => {
    try {
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;

        if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        const quote = await fetchQuote(req);
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuote,
};