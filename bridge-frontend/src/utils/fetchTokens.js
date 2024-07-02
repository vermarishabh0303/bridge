// src/utils/fetchTokens.js
import axios from 'axios';
import { API_URL } from '../constants/urls';

const fetchTokens = async () => {
    try {
        const response = await axios.get(`${API_URL}/tokens`);
        const tokenData = response.data || [];
        const uniqueTokens = tokenData.filter((token, index, self) =>
            index === self.findIndex((t) => (
                t.symbol === token.symbol
            ))
        ).map(token => ({
            value: token.address,
            label: token.symbol,
            logo: token.logoURI,
            chainId: token.chainId,
        }));
        uniqueTokens.sort((a, b) => a.label.localeCompare(b.label));
        return uniqueTokens;
    } catch (error) {
        console.error("Failed to fetch tokens.");
        return [];
    }
};

export default fetchTokens;
