import axios from 'axios';
import validator from 'validator';
import { getToken } from '@hooks/colaborador';
const BASE_URL = 'https://app.aocto.com/api/apppongocolaborador'
//LOGIN/REGISTER APIimport axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://192.168.0.10:3000'); // change to your server ip
const API_CHAT = 'http://192.168.0.10:3000/chat';

export const loginColaborador = async (email, password) => {
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedPassword = validator.escape(password);
    try {
        const response = await axios.post(`https://app.aocto.com/api/apppongocolaborador/auth`, {
            email: sanitizedEmail,
            password: sanitizedPassword,
        });
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};

export const listUser = async (token) => {
    try {
        const res = await axios.get(`${BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error revalidating token:", error);
        return false;
    }
}

export const getChat = (id) => {
    socket.emit("getChat", id);
    return axios.get(API_CHAT + `/${id}`);
}

export const getChats = () => {
    socket.emit("getChats"); // esse request vai para o servidor
    return axios.get(API_CHAT);
}

export const listChats = async (page = 1) => {
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/chats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export const listMessages = async (id) => {
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/chats/getconversa/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
        return res.data.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export const searchChats = async (search, ) => {
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/chats`, {
            busca: search,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}