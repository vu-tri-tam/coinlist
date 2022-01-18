import axiosSever from "../configAxiosSever";

const AxiosConfigSever = {
    getCoin: () => {
        return axiosSever.get('/api/coin');
    },
    updateSupplyCoin: (id, data) => {
        return axiosSever.patch(`/api/coin/${id}`, data);
    }

}
export default AxiosConfigSever