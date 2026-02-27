import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const useEncryptDecrypt = () => {

    const encryptData = (userData) => {
        if (!userData) return null;
        
        return CryptoJS.AES.encrypt(
            JSON.stringify(userData),
            SECRET_KEY
        ).toString();
    }

    const decryptData = (ciphertext) => {
        if (!ciphertext) return null;

        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            
            return JSON.parse(decryptedText);
        } catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    }

    return { encryptData, decryptData };
}