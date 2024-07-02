import React, { useState, useEffect } from 'react';
import axios from 'axios';
import filterTokensByChainId from '../../utils/filterTokensByChainId';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './QuoteForm.css';
import { API_URL } from '../../constants/urls';

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
    const [loading, setLoading] = useState(false);
    const [loadingSrcTokens, setLoadingSrcTokens] = useState(false);
    const [loadingDestTokens, setLoadingDestTokens] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndFilterTokens = async () => {
            setLoadingSrcTokens(true);
            console.log("Fetching tokens for chainId:", formData.srcChainId);
            const filteredTokens = await filterTokensByChainId(formData.srcChainId);
            console.log("Fetched tokens:", filteredTokens);
            setFilteredSrcTokens(filteredTokens);
            setLoadingSrcTokens(false);
        };
        if (formData.srcChainId) {
            fetchAndFilterTokens();
        }
    }, [formData.srcChainId]);

    useEffect(() => {
        const fetchAndFilterTokens = async () => {
            setLoadingDestTokens(true);
            console.log("Fetching tokens for chainId:", formData.destChainId);
            if (formData.destChainId) {
                let filteredTokens = await filterTokensByChainId(formData.destChainId);
                if (formData.srcChainId === formData.destChainId) {
                    filteredTokens = filteredTokens.filter(token => token.value !== formData.fromTokenAddress);
                }
                console.log("Fetched tokens:", filteredTokens);
                setFilteredDestTokens(filteredTokens);
            }
            setLoadingDestTokens(false);
        };
        fetchAndFilterTokens();
    }, [formData.destChainId, formData.fromTokenAddress]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption, action) => {
        setFormData({ ...formData, [action.name]: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } = formData;
        const amountInWei = (parseFloat(amount) * 10 ** 18).toString(); // Convert amount to wei
        console.log("amountInWei: ", amountInWei)
        try {
            const response = await axios.get(API_URL, {
                params: {
                    srcChainId,
                    fromTokenAddress,
                    amount: amountInWei,
                    destChainId,
                    toTokenAddress
                }
            });
            console.log(response.data);
            navigate('/quotation', { state: { quoteData: response.data } });
        } catch (error) {
            console.error("Error fetching quote:", error);
        } finally {
            setLoading(false);
        }
    };

    const customSingleValue = ({ data }) => (
        <div className="custom-single-value">
            <img src={data.logo} alt={data.label} className="token-logo" />
            <span>{data.label}</span>
        </div>
    );

    const customOption = ({ innerRef, innerProps, data }) => (
        <div ref={innerRef} {...innerProps} className="custom-option">
            <img src={data.logo} alt={data.label} className="token-logo" />
            <span>{data.label}</span>
        </div>
    );

    if (loading) {
        return <div>
            Fetching results...
            <div>
                <img src="/assets/waitingGif.gif" alt="Loading..." style={{ width: '150px', height: '150px' }} />
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
                        noOptionsMessage={() => loadingSrcTokens ? "Fetching tokens..." : "No tokens available"}
                        isDisabled={!formData.srcChainId}
                    />
                </label>
                <label>
                    Amount:
                    <div className="amount-container">
                        <input type="text" name="amount" value={formData.amount} onChange={handleChange} required />
                        <span className="amount-unit">ETH</span>
                    </div>
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
                        noOptionsMessage={() => loadingDestTokens ? "Fetching tokens..." : "No tokens available"}
                        isDisabled={!formData.destChainId}
                    />
                </label>
                <button type="submit" disabled={!formData.srcChainId || !formData.fromTokenAddress || !formData.amount || !formData.destChainId || !formData.toTokenAddress}>Get Quote</button>
            </form>
        </div>
    );
};

export default QuoteForm;
