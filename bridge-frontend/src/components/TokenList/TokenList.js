import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import fetchTokens from '../../utils/fetchTokens';
import { useNavigate } from 'react-router-dom';
import './TokenList.css';

const TokenList = () => {
    const [tokens, setTokens] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetTokens = async () => {
            const uniqueTokens = await fetchTokens();
            console.log("Fetched Tokens:", uniqueTokens);
            setTokens(uniqueTokens);
        };
        fetchAndSetTokens();
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

