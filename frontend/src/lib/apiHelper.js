import axios from 'axios';
import { JWT_TOKEN, BASE_URL } from './constant';



const axiosWithAuth = () => {
    const token = localStorage.getItem(JWT_TOKEN);

    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return instance;
};

// Fetch data
export const fetchData = async (endpoint) => {
    try {
        const response = await axiosWithAuth().get(`/${endpoint}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

// Store data
export const storeData = async (endpoint, data) => {
    try {
        const response = await axiosWithAuth().post(`/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

// Update data
export const updateData = async (endpoint, id, data) => {
    try {
        const response = await axiosWithAuth().put(`/${endpoint}/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

// Delete data
export const deleteData = async (endpoint, id) => {
    try {
        const response = await axiosWithAuth().delete(`/${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};
