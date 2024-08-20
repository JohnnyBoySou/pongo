import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export const login = async (email, password) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/login`, {
            'email': email,
            'password': password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message);
    }
};


export const logout = async () => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {   
        const res = await axios.post(`${BASE_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message);
    }
}

export const forgotPassword = async (email) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/forgot-password`, {
            'email': email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message);
    }
}

export const resetPassword = async (email, password, token) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/reset-password`, {
            'email': email,
            'password': password,
            'token': token
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message);
    }
}

export const register = async (name, email, password) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/register`, {
            'name': name,
            'email': email,
            'password': password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message);
    }
}