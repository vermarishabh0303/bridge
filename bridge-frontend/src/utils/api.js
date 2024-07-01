import axios from 'axios';
import { API_URL } from '../constants/urls';

export const fetchSupportedTokens = async () => {
    try {
        const response = await axios.get(`${API_URL}/tokens`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch tokens');
    }
};
