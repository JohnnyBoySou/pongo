import axios from 'axios';
import getToken from '@hooks/getToken';

import getBaseURL from '@hooks/getBaseUrl';
const URL_COL = 'https://app.aocto.com/api/apppongocolaborador'

import socket from '@hooks/socket';
import { getPreferences as getUser } from '@hooks/preferences';
import { getToken as getTokenCol, getPreferences as getCol } from '@hooks/colaborador';

export const assinarChat = (token) => {
    socket.emit('entrarsala', {
        room: token,
    })
}
export const enviarMsg = async (params, type,) => {
    const profile = type == 'U' ? await getUser() : await getCol()
    const { user, message, token, } = params
    const id = Math.floor(100000 + Math.random() * 900000)
    socket.emit('chat message', {
        id_empresa: 6,
        id_pet_colaborador: type == 'U' ? null : profile?.id_pet_colaborador,
        id_pet_tutor: user?.id_pet_tutor,
        id_pet_chat: user?.id_pet_chat,
        id_pet_chat_conversa: id,
        mensagem: message,
        type: type,
        token: token,
        type_menssagem: 'texto',
        criado_em: new Date(),
        ...(type == 'U'
            ? { usuario: { name: profile?.name, avatar: profile?.avatar } }
            : { colaborador: { name: profile?.name, avatar: profile?.avatar } }
        ),
    })
}

export const enviarImage = async (params, type) => {
    const profile = type == 'U' ? await getUser() : await getCol()
    const { user, image, token, } = params

    const BASE_URL = type == 'C' ? URL_COL : await getBaseURL();
    const tokenUser = type === 'C' ? await getTokenCol() : await getToken();

    const id = Math.floor(100000 + Math.random() * 900000)
    try {
        const res = await axios.post(`${BASE_URL}/chats/enviarimagem`, {
            imagem: 'data:image/png;base64,' + image,
        }, {
            headers: {
                Authorization: `Bearer ${tokenUser}`,
            },
        });
        if (res.data.url) {
            socket.emit('chat message', {
                id_empresa: 6,
                id_pet_colaborador: type == 'U' ? null : profile?.id_pet_colaborador,
                id_pet_tutor: user?.id_pet_tutor,
                id_pet_chat: user?.id_pet_chat,
                id_pet_chat_conversa: id,
                type: type,
                mensagem: res.data.url,
                token: token,
                type_menssagem: 'imagem',
                criado_em: new Date(),
                ...(type == 'U'
                    ? { usuario: { name: profile?.name, avatar: profile?.avatar } }
                    : { colaborador: { name: profile?.name, avatar: profile?.avatar } }
                ),
            })
        }
        return true;
    } catch (error) {
        console.log(error.response)
    }
}

export const enviarAudio = async (params, type) => {
    const profile = type == 'U' ? await getUser() : await getCol()
    const { user, audio, token, } = params
    const BASE_URL = type == 'C' ? URL_COL : await getBaseURL();
    const tokenUser = type === 'C' ? await getTokenCol() : await getToken();

    const id = Math.floor(100000 + Math.random() * 900000)
    console.log(audio.slice(0,12))
    try {
        const res = await axios.post(`${BASE_URL}/chats/enviaraudio`, {
            audio: audio,
        }, {
            headers: {
                Authorization: `Bearer ${tokenUser}`,
            },
        });
        console.log(res.data.url)
        if (res.data.url) {
            socket.emit('chat message', {
                id_empresa: 6,
                id_pet_colaborador: type == 'U' ? null : profile?.id_pet_colaborador,
                id_pet_tutor: user?.id_pet_tutor,
                id_pet_chat: user?.id_pet_chat,
                id_pet_chat_conversa: id,
                type: type,
                mensagem: res.data.url,
                token: token,
                type_menssagem: 'audio',
                criado_em: new Date(),
                ...(type == 'U'
                    ? { usuario: { name: profile?.name, avatar: profile?.avatar } }
                    : { colaborador: { name: profile?.name, avatar: profile?.avatar } }
                ),
            })
        }
        return true;
    } catch (error) {
        console.log(error.response)
    }
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

export const listChats = async (page = 1, type) => {
    const BASE_URL = type == 'C' ? URL_COL : await getBaseURL();
    const token = type === 'C' ? await getTokenCol() : await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/chats?page=${page}`, {
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

export const searchChats = async (search, page = 1, type) => {
    const BASE_URL = type == 'C' ? URL_COL : await getBaseURL();
    const token = type === 'C' ? await getTokenCol() : await getToken();
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

export const listMessages = async (id, type) => {
    const BASE_URL = type == 'C' ? URL_COL : await getBaseURL();
    const token = type === 'C' ? await getTokenCol() : await getToken();
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