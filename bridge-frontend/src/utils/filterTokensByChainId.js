// src/utils/filterTokensByChainId.js
import fetchTokens from './fetchTokens';

const filterTokensByChainId = async (chainId) => {
    const tokens = await fetchTokens();
    return tokens.filter(token => token.chainId.toString() === chainId);
};

export default filterTokensByChainId;
