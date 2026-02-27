
import { useEncryptDecrypt } from "../hooks/encryptDecryptData";
import { handleCookie } from "../hooks/storeToCookie";

export const useAuthManager = () => {

    const { encryptData, decryptData } = useEncryptDecrypt();
    const { storeToCookie, getFromCookie } = handleCookie();

    const saveSecureSession = (userData) => {

        if (!userData) return;

        const encrypted = encryptData(userData);
        storeToCookie(encrypted);
    };

    const retrieveSession = () => {
        const cookieData = getFromCookie();
        if (!cookieData) return null;

        return decryptData(cookieData);
    }

    return { saveSecureSession, retrieveSession };
}
