import React, { useEffect, useState } from "react";
import { fetchRecommendedTokens, getUniqueChains } from './api';

const ChainSelector = ({ onSelectChain }) => {
  const [chains, setChains] = useState([]);

  useEffect(() => {
    const loadChains = async () => {
      const tokens = await fetchRecommendedTokens();
      const uniqueChains = getUniqueChains(tokens);
      setChains(uniqueChains);
    };

    loadChains();
  }, []);

  return (
    <>
      <h3>Select Chain</h3>
      <div className="chain_selector">
          {console.log(chains)}
        {chains.map((chain, index) => (
          
          <button key={index} onClick={() => onSelectChain(chain)}>
            {chain}
          </button>
        ))}
      </div>
    </>
  );
};

export default ChainSelector;
