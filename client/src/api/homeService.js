import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getDataDashboard = async (endpoint) => {
    const response = await axios.get(API_URL + endpoint);
    
    return response.data;
}
