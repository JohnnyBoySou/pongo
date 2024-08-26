import axios from 'axios';
import io from 'socket.io-client';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


const socket = io('http://192.168.0.10:3000'); // change to your server ip
const API_CHAT = 'http://192.168.0.10:3000/chat';

export const getChat = (id) => {
    socket.emit("getChat", id);
    return axios.get(API_CHAT + `/${id}`);
}

export const getChats = () => {
    socket.emit("getChats"); // esse request vai para o servidor
    return axios.get(API_CHAT);
}



export const createChat = async (titulo) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/chats/criarchat`, {
            titulo: 'teste',
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data
    } catch (error) {
        console.log('Error:', error.message);
        if (error.request) {
            console.log('Request data:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        throw new Error(error.message);
    }
}



export const listChats = async (page = 1) => {
    const BASE_URL = await getBaseURL();
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


export const searchChats = async (search, page = 1) => {
    const BASE_URL = await getBaseURL();
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


export const listMessages = async (id) => {
    const BASE_URL = await getBaseURL();
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