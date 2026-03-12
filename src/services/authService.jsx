import axios from 'axios';

import { useAuthManager } from '../utils/security/authManager';


export const login = async (email, password) => {

  const { saveSecureSession } = useAuthManager();

  try {

    const response = await axios.post('https://localhost:7047/api/Auth/login', {
      email: email,
      password: password
    });

    const userReponse = response.data;

    if (userReponse.success) {

      const userData = userReponse.data
      saveSecureSession(userData);

      return { success: true };

    }

    return { success: false, message: userResponse.message || "Login failed" };

  } catch (error) {

    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      const data = error.response.data;

      errorMessage = data.message;
    } else if (error.request) {
      errorMessage = "No response from server. Please check your connection.";
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};

export const register = async (firstName, lastName, email, username, password) => {

  try {

    const response = await axios.post('https://localhost:7047/api/Auth/register', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: username,
      password: password
    });

    const responseData = response.data.data;

    return {
      creationStatus: responseData.creationStatus,
      errors: responseData.errors || []
    };

  } catch (error) {

    const errorBody = error.response?.data;

    let errorList = ["An unexpected error occurred."];

    if (errorBody) {

      if (errorBody.errors) {
        errorList = Object.values(errorBody.errors).flat();
      }
      
      else if (errorBody.data?.errors) {
        errorList = Array.isArray(errorBody.data.errors)
          ? errorBody.data.errors
          : Object.values(errorBody.data.errors).flat();
      }
      
      else if (errorBody.message) {
        errorList = [errorBody.message];
      }
    }
    else if (error.request) {
      errorList = ["Cannot connect to server. Please check your API."];
    }

    return {
      creationStatus: false,
      errors: errorList
    };
  }
};

export const logout = async () => {

  const { retrieveSession } = useAuthManager();

  const userData = retrieveSession();

  const token = userData.token;

  if (!token) {
    return {
      status: false,
      message: "No token found!"
    };
  }

  try {

    const response = await axios.post('https://localhost:7047/api/Auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const logoutDetails = response.data;
    const logoutData = logoutDetails.data;

    if (!logoutData.success) {

      const errorMsg = logoutData.errors && logoutData.errors.length > 0
        ? logoutData.errors.join(", ")
        : logoutData.message || "Logout failed";

      return { status: false, message: errorMsg }
    }

    return { status: true };

  } catch (error) {

    const serverMessage = error.response?.data?.data?.message
      || error.response?.data?.message
      || error.message;

    return {
      status: false,
      message: `Server error: ${serverMessage}`
    };
  }
};
