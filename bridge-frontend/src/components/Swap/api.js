// api.js
const API_URL = 'https://aggregator-api.xy.finance/v1/recommendedTokens';

export const fetchRecommendedTokens = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.success) {
      return data.recommendedTokens;
    } else {
      throw new Error('Failed to fetch recommended tokens');
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUniqueChains = (tokens) => {
  const uniqueChains = new Set();
  tokens.forEach(token => uniqueChains.add(token.chainId));
  return Array.from(uniqueChains);
};

export const getUniqueTokens = (tokens) => {
  const uniqueTokens = new Map();
  tokens.forEach(token => {
    if (!uniqueTokens.has(token.symbol)) {
      uniqueTokens.set(token.symbol, token);
    }
  });
  return Array.from(uniqueTokens.values());
};
