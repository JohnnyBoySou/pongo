import axios from 'axios';
import io from 'socket.io-client';

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

export const createChat = (id) => {
    socket.emit("createChat", id);
    return axios.post(API_CHAT, { id });
}

export const listChat = (id) => {
    socket.emit("listChat", id);
    return axios.get(API_CHAT + `/${id}`);
}