import axios from 'axios'; 
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';
import socket from '@hooks/socket';
import { getPreferences } from '@hooks/preferences';

export const assinarChat = (token) => {
    socket.emit('entrarsala', {
        room: token,
    })
}
export const enviarMsg = async (params) => {
    const profile = await getPreferences()
    const { user, message, token, } = params
    const id = Math.floor(100000 + Math.random() * 900000)
    socket.emit('chat message', {
        id_empresa: 6,
        id_pet_colaborador: null,
        id_pet_tutor: user?.id_pet_tutor,
        id_pet_chat: user?.id_pet_chat,
        id_pet_chat_conversa: parseInt(id), 
        mensagem: message,
        type: 'U',
        token: token,
        type_menssagem: 'texto',
        criado_em: new Date(),
        usuario: { 
            name: profile?.name, 
            avatar: profile?.avatar,
        },
    })
}

export const enviarImage = (params) => {
    const { user, imagem, token } = params
    const id = Math.floor(100000 + Math.random() * 900000)
    socket.emit('chat message', {
        id_empresa: 6,
        id_pet_tutor: user?.id_pet_tutor,
        id_pet_chat: user?.id_pet_chat,
        id_pet_chat_conversa: parseInt(id), 
        type: 'U',
        mensagem: imagem,
        token: token,
        type_menssagem: 'imagem',
        criado_em: new Date(),
    })
}

export const enviarArquivo = (params) => {
    const { user, arquivo, token } = params
    const id = Math.floor(100000 + Math.random() * 900000)
    socket.emit('chat message', {
        id_empresa: 6,
        id_pet_tutor: user?.id_pet_tutor,
        id_pet_chat: user?.id_pet_chat,
        id_pet_chat_conversa: parseInt(id), 
        mensagem: arquivo,
        type: 'U',
        token: token,
        type_menssagem: 'arquivo',
        criado_em: new Date(),
    })
}

export const enviarAudio = (params) => {
    const { user, audio, token } = params
    const id = Math.floor(100000 + Math.random() * 900000)
    socket.emit('chat message', {
        id_empresa: 6,
        id_pet_tutor: user?.id_pet_tutor,
        id_pet_chat: user?.id_pet_chat,
        id_pet_chat_conversa: parseInt(id), 
        type: 'U',
        token: token,
        type_menssagem: 'audio',
        criado_em: new Date(),
    })
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
            titulo: titulo,
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
        return res.data
    } catch (error) {
        console.log(error.request)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}