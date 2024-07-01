import React, { useState, useEffect } from 'react';
import filterTokensByChainId from '../../utils/filterTokensByChainId';
import Select from 'react-select';
import './QuoteForm.css';

const QuoteForm = () => {
    const [formData, setFormData] = useState({
        srcChainId: '',
        fromTokenAddress: '',
        amount: '',
        destChainId: '',
        toTokenAddress: ''
    });
    const [filteredSrcTokens, setFilteredSrcTokens] = useState([]);
    const [filteredDestTokens, setFilteredDestTokens] = useState([]);


    useEffect(() => {
        const fetchAndFilterTokens = async () => {
            const filteredTokens = await filterTokensByChainId(formData.srcChainId);
            setFilteredSrcTokens(filteredTokens);
        };
        if (formData.srcChainId) {
            fetchAndFilterTokens();
        }
    }, [formData.srcChainId]);

    useEffect(() => {
        const fetchAndFilterTokens = async () => {
            const filteredTokens = await filterTokensByChainId(formData.destChainId);
            setFilteredDestTokens(filteredTokens);
        };
        if (formData.destChainId) {
            fetchAndFilterTokens();
        }
    }, [formData.destChainId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption, action) => {
        setFormData({ ...formData, [action.name]: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the submit logic here, like calling the backend API
        console.log(formData);
    };

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
            <h2>Get Quote</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Source Chain ID:
                    <input type="text" name="srcChainId" value={formData.srcChainId} onChange={handleChange} required />
                </label>
                <label>
                    From Token Address:
                    <Select
                        name="fromTokenAddress"
                        options={filteredSrcTokens}
                        onChange={handleSelectChange}
                        components={{ SingleValue: customSingleValue, Option: customOption }}
                        placeholder="Select Token"
                        noOptionsMessage={() => "No tokens available"}
                        isDisabled={!formData.srcChainId}
                    />
                </label>
                <label>
                    Amount:
                    <input type="text" name="amount" value={formData.amount} onChange={handleChange} required />
                </label>
                <label>
                    Destination Chain ID:
                    <input type="text" name="destChainId" value={formData.destChainId} onChange={handleChange} required />
                </label>
                <label>
                    To Token Address:
                    <Select
                        name="toTokenAddress"
                        options={filteredDestTokens}
                        onChange={handleSelectChange}
                        components={{ SingleValue: customSingleValue, Option: customOption }}
                        placeholder="Select Token"
                        noOptionsMessage={() => "No tokens available"}
                        isDisabled={!formData.destChainId}
                    />
                </label>
                <button type="submit" disabled={!formData.srcChainId || !formData.fromTokenAddress || !formData.amount || !formData.destChainId || !formData.toTokenAddress}>Get Quote</button>
            </form>
        </div>
    );
};

export default QuoteForm;
