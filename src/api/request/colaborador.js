import axios from 'axios';
import socket from '@hooks/socket';
import { getToken, getPreferences } from '@hooks/colaborador';
const BASE_URL = 'https://app.aocto.com/api/apppongocolaborador'



export const enviarMsg = async (params) => {
    const profile = await getPreferences()
    const { user, message, token,  } = params 
    const id = Math.floor(100000 + Math.random() * 900000)
    socket.emit('chat message', {
        id_empresa: 6,
        id_pet_colaborador: 1,
        id_pet_tutor: user?.id_pet_tutor,
        id_pet_chat: user?.id_pet_chat,
        id_pet_chat_conversa: parseInt(id), 
        mensagem: message,
        type: 'C',
        token: token,
        type_menssagem: 'texto', 
        colaborador: { 
            name: profile?.name, 
            avatar: profile?.avatar,
        },
        criado_em: new Date(),
    })
}


export const assinarChat = (token) => {
    socket.emit('entrarsala', {
        room: token,
    })
}

export const loginColaborador = async (email, password) => {
    try {
        const response = await axios.post(`https://app.aocto.com/api/apppongocolaborador/auth`, {
            email: email,
            password: password,
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
        const res = await axios.get(`${BASE_URL}/chats?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data || []
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
        return res.data
    } catch (error) {
        console.log(error.request)
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