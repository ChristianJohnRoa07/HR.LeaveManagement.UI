import Cookies from 'js-cookie';

export const handleCookie = () => {

    const storeToCookie = (encryptedData) => {
        Cookies.set('user_session', encryptedData, {
            expires: 1,
            secure: true,
            sameSite: 'strict'
        });
    }

    const getFromCookie = () => {
        return Cookies.get('user_session');
    }

    return { storeToCookie, getFromCookie };
}