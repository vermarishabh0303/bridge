import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './TokenList.css';

const TokenList = () => {
    const [tokens, setTokens] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                console.log('Fetching tokens from backend...');
                const response = await axios.get('http://localhost:3001/api/tokens'); // Specify port 3001
                console.log('Response from backend:', response); // Log the entire response
                const tokenData = response.data || [];
                const uniqueTokens = tokenData.filter((token, index, self) =>
                    index === self.findIndex((t) => (
                        t.symbol === token.symbol
                    ))
                ).map(token => ({
                    value: token.address,
                    label: token.symbol,
                    logo: token.logoURI,
                }));
                uniqueTokens.sort((a, b) => a.label.localeCompare(b.label)); // Sort tokens alphabetically by symbol
                setTokens(uniqueTokens);
            } catch (error) {
                console.error("Error fetching tokens:", error); // Log the error
                setError("Failed to fetch tokens.");
            }
        };
        fetchTokens();
    }, []);

    const customSingleValue = ({ data }) => (
        <div className="custom-single-value">
            <img src={data.logo} alt={data.label} className="token-logo" />
            {data.label}
        </div>
    );

    const customOption = ({ innerRef, innerProps, data }) => (
        <div ref={innerRef} {...innerProps} className="custom-option">
            <img src={data.logo} alt={data.label} className="token-logo" />
            {data.label}
        </div>
    );

    return (
        <div>
            <h2>Recommended Tokens</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Select
                options={tokens}
                components={{ SingleValue: customSingleValue, Option: customOption }}
                placeholder="Supported Tokens"
                noOptionsMessage={() => "No tokens available"}
            />
            <button onClick={() => navigate('/quote')}>Get Quote</button>
        </div>
    );
};

export default TokenList;

