import React, { useState } from "react";
import "./Swap.css";
import ChainSelector from "./ChainSelector";
import TokenSelector from "./TokenSelector";
import { getQuote } from "./Quotation";

const Swap = () => {
  const [openModalFrom, setOpenModalFrom] = useState(false);
  const [openModalTo, setOpenModalTo] = useState(false);
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedChain2, setSelectedChain2] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedToken2, setSelectedToken2] = useState(null);
  const [amount, setAmount] = useState();
  const [qouteResult, setQouteResult] = useState();

  const handleSelectChain = (chainId) => {
    console.log("Selected chain:", chainId); // Debug statement
    setSelectedChain(chainId);
    setSelectedToken(null); // Reset token when chain is changed
  };

  const handleSelectToken = (token) => {
    console.log("Selected token:", token); // Debug statement
    setSelectedToken(token);
    setOpenModalFrom(false); // Close modal after selection
  };

  function handleChange(event) {
    const { value } = event.target;
    if (isNaN(value)) return;
    setAmount(value);
  }

  const handleSelectChain2 = (chainId) => {
    console.log("Selected chain:", chainId); // Debug statement
    setSelectedChain2(chainId);
    setSelectedToken2(null); // Reset token when chain is changed
  };

  const handleSelectToken2 = (token) => {
    console.log("Selected token:", token); // Debug statement
    setSelectedToken2(token);
    setOpenModalTo(false); // Close modal after selection
  };

  async function handleGetQoute() {
    const amt = amount * 10 ** 18;
    const qoute = await getQuote(
      selectedChain,
      selectedToken?.address,
      amt,
      selectedChain2,
      selectedToken2?.address
    );
    if (qoute?.isSuccess) {
      setQouteResult(qoute);
    }
  }

  return (
    <div className="swap_page">
      <div className="swap_container">
        {openModalFrom && (
          <div className="modal_container">
            <ChainSelector onSelectChain={handleSelectChain} />
            {
              <TokenSelector
                selectedChain={selectedChain}
                onSelectToken={handleSelectToken}
              />
            }
          </div>
        )}
        {openModalTo && (
          <div className="modal_container">
            <ChainSelector onSelectChain={handleSelectChain2} />
            {
              <TokenSelector
                selectedChain={selectedChain2}
                onSelectToken={handleSelectToken2}
              />
            }
          </div>
        )}
        <div className="input">
          <input
            placeholder="Amount From (In ETH)"
            value={amount}
            onChange={handleChange}
          />

          <div
            className="currency_selector"
            onClick={() => setOpenModalFrom(true)}
            >
            {selectedToken ? selectedToken.symbol : "Select Token"}
          </div>
        </div>
        <div className="input">
          <input
            disabled={true}
            value={(
              parseInt(qouteResult?.toTokenAmount) / 10 ** 18 || 0
            ).toFixed(2)}
            placeholder={"Amount To (In ETH)"}
          />
          <div
            className="currency_selector"
            onClick={() => setOpenModalTo(true)}
          >
            {selectedToken2 ? selectedToken2.symbol : "Select Token"}
          </div>
        </div>
        {qouteResult?.estimatedGas && (
          <h3>Estimated Gas {qouteResult.estimatedGas}</h3>
        )}
        <button className="button" onClick={handleGetQoute}>
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default Swap;
