import axios from 'axios';

import { useAuthManager } from '../utils/security/authManager'; 


export const login = async (email, password) => {

  const { saveSecureSession } = useAuthManager();

  try {

    const response = await axios.post('https://localhost:7047/api/Auth/login', {
      email: email,
      password: password
    });

    const userData = response.data;

    saveSecureSession(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
