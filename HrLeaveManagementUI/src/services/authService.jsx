import React, { useState } from 'react';
import axios from 'axios';

export const login = async (email, password) => {
  try {

    const response = await axios.post('https://localhost:7047/api/Auth/login', {
      email: email,
      password: password
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
