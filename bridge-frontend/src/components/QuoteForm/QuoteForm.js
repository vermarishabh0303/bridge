import React, { useState, useEffect } from 'react';
import axios from 'axios';
import filterTokensByChainId from '../../utils/filterTokensByChainId';
import { useNavigate } from 'react-router-dom';
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
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handling the submit logic here, like calling the backend API
        setLoading(true);
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = formData;
        try {
            const response = await axios.get(`https://open-api.xy.finance/v1/quote`, {
                params: {
                    srcChainId,
                    fromTokenAddress,
                    amount,
                    destChainId,
                    toTokenAddress
                }
            });
            console.log(response.data);
            // Navigate to the /quotation endpoint
            navigate('/quotation', { state: { quoteData: response.data } });
        } catch (error) {
            console.error("Error fetching quote:", error);
        } finally {
            setLoading(false); // Set loading state to false
        }
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

    if (loading) {
        return <div>
            Fetching results...
                <div>
                    <img src="/assets/waitingGif.gif" alt="Loading..." style={{ width: '150px', height: '150px' }}/>
                </div>
            </div>;
    }


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
                {/* <button onClick={() => navigate('/quotation')}>Get Parameters</button> */}
            </form>
        </div>
    );
};

export default QuoteForm;
