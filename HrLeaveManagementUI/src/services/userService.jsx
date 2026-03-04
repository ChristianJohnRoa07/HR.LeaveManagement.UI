import axios from 'axios';

import { useAuthManager } from '../utils/security/authManager';

export const getUserLeaveAllocations = async () => {

    const { retrieveSession } = useAuthManager();

    try {

        const userData = retrieveSession();

        const userId = userData.id;
        const token = userData.token;

        const response = await axios.get(`https://localhost:7047/api/LeaveAllocations/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            status: true,
            response: response.data
        };

    } catch (error) {
        return {
            status: false,
            error: error.response?.data || error.message
        };
    }
};
