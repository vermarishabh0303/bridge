import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import sampleQuoteData from '../../constants/sampleQuoteData.json'; // for testing

const Quotation = () => {
    const location = useLocation();
    const { quoteData } = location.state || {};
    // const quoteData = sampleQuoteData;
    const navigate = useNavigate();

    if (!quoteData) {
        return <div>No quotation data available</div>;
    }

    try {
        if (!quoteData.isSuccess) {
            throw new Error("Quotation failed: " + (quoteData.msg || "Unknown error"));
        }

        const estimatedGasInEth = (quoteData.estimatedGas / 10 ** 18).toFixed(18);

        return (
            <div>
                <h2>Quotation Details</h2>
                {/* <p><strong>From Token:</strong> {quoteData.fromTokenAddress}</p>
                <p><strong>To Token:</strong> {quoteData.toTokenAddress}</p> */}
                <p><strong>To Token Amount:</strong> {quoteData.toTokenAmount}</p>
                <p><strong>From Token Value:</strong> {quoteData.fromTokenValue}</p>
                <p><strong>To Token Value:</strong> {quoteData.toTokenValue}</p>
                <p><strong>Estimated Transfer Time:</strong> {quoteData.estimatedTransferTime} seconds</p>
                <h3><strong>Estimated Gas:</strong> {estimatedGasInEth} ETH</h3>
                <button onClick={() => navigate('/transactionParams')}>Bridge</button>
            </div>
        );
    } catch (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error.message}</p>
            </div>
        );
    }
};

export default Quotation;
