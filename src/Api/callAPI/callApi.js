import axiosSever from "../configAxiosSever";

const AxiosConfigSever = {
    postUserLogin: (login) => {
        return axiosSever.post('/api/auth/login', login);
    },
    postUserRegister: (register) => {
        return axiosSever.post('/api/auth/register', register);
    },
    getUserLogin: () => {
        return axiosSever.get('/api/auth');
    },
    updateUserLogin: (idUser, data) => {
        return axiosSever.patch(`/api/auth/${idUser}`, data);
    },
    updateWalletUser: (idUser, data) => {
        return axiosSever.patch(`/api/auth/updateWallet/${idUser}`, data);
    },
    updateUserVerifySuccess: (idUser, data) => {
        return axiosSever.patch(`/api/auth/verify/${idUser}`, data);
    },
    postInfoUserAffterVerify: (data) => {
        return axiosSever.post(`/api/account`, data);
    },
    getInfoUserAffterVerify: () => {
        return axiosSever.get(`/api/account/verify-account`);
    }
    // getInfoCoin: () => {
    //     return axiosSever.get(`/api/coin`);
    // },

}
export default AxiosConfigSever