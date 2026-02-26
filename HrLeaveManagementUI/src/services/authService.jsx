import React, { useState } from 'react';
import axios from 'axios';

const login = async () => {
      try {
        const response = await axios.post('https://api.example.com/posts');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };


export default [
    login
];