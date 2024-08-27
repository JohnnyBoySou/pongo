import axios from 'axios';

import getBaseURL from '@hooks/getBaseUrl';
import getToken from '@hooks/getToken';

export const getNotifications = async () => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/notificacoes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};
export const singleNotification = async (id) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/notificacoes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};