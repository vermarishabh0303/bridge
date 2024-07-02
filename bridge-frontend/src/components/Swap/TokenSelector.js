import React, { useEffect, useState } from "react";
import { fetchRecommendedTokens, getUniqueTokens } from './api';

const TokenSelector = ({ selectedChain, onSelectToken }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const loadTokens = async () => {
      console.log("Fetching tokens for chain:", selectedChain); // Debug statement
      const recommendedTokens = await fetchRecommendedTokens();
      const tokensForChain = recommendedTokens.filter(token => token.chainId === selectedChain);
      const uniqueTokens = getUniqueTokens(tokensForChain);
      console.log("Tokens for selected chain:", uniqueTokens); // Debug statement
      setTokens(uniqueTokens);
    };

    if (selectedChain) {
      loadTokens();
    }
  }, [selectedChain]);

  return (
    <>
      <h3>Select Token</h3>
      <div className="token_listing">
        {tokens.map((token, index) => (
          <div className="each_token" key={index} onClick={() => onSelectToken(token)}>
            <img src={token.logoURI} alt={token.symbol} /> {token.symbol}
          </div>
        ))}
      </div>
    </>
  );
};

export default TokenSelector;
