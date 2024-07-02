const { fetchQuote } = require('../services/quoteService');

const getQuote = async (req, res) => {
    try {
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;

        if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        const quote = await fetchQuote({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress });
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuote,
};




const getQuote = async (req, res) => {
    try {
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = req.query;

        // Validate query parameters
        if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        if (isNaN(srcChainId) || isNaN(destChainId) || isNaN(amount) ||
            !/^0x[a-fA-F0-9]{40}$/.test(fromTokenAddress) ||
            !/^0x[a-fA-F0-9]{40}$/.test(toTokenAddress)) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }

        // Fetch the quote
        const quote = await fetchQuote({ srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress });

        // Send the quote as the response
        res.status(200).json(quote);
    } catch (error) {
        // Handle any errors that occur during fetching the quote
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuote,
};