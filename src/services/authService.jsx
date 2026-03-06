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

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};

export const logout = async () => {

  const { retrieveSession } = useAuthManager();

  const userData = retrieveSession();

  const token = userData.token;

  try {

    const response = await axios.post('https://localhost:7047/api/Auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data.status){
      return true;
    }
    
  } catch (error) {
    console.error("Server error:", error);
    return false;
  }
};
