import axios from "axios"

const axiosConfig = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
})

export const AxiosConfig = {

    getAllCoinTop: (perPage, page) => {
        return axiosConfig.get(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`);
    },
    getAllCoin100: (idCoin) => {
        return axiosConfig.get(`/coins/markets?vs_currency=usd&ids=${idCoin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    },
    getCoinById: (id) => {
        return axiosConfig.get(`/coins/${id}?tickers=true`);
    },
    getDetailCoin: (id) => {
        return axiosConfig.get(`/coins/${id}/market_chart?vs_currency=usd&days=1`);
    },
    getDetailCoinWeek: (id) => {
        return axiosConfig.get(`/coins/${id}/market_chart?vs_currency=usd&days=7`);
    },
    getDetailCoinYear: (id) => {
        return axiosConfig.get(`/coins/${id}/market_chart?vs_currency=usd&days=365`);
    },
    getDetailVolumnCoinDay: (id) => {
        return axiosConfig.get(`/exchanges/${id}/volume_chart?days=1`);
    },
    getDetailVolumnCoinWeek: (id) => {
        return axiosConfig.get(`/exchanges/${id}/volume_chart?days=7`);
    },
    getDetailVolumnCoinMonth: (id) => {
        return axiosConfig.get(`/exchanges/${id}/volume_chart?days=30`);
    },
    getDetailVolumnCoinYear: (id) => {
        return axiosConfig.get(`/exchanges/${id}/volume_chart?days=365`);
    },
    getCatelogy: () => {
        return axiosConfig.get(`/coins/categories/list`);
    },
    getPlatforms: () => {
        return axiosConfig.get(`/asset_platforms`);
    },
    getTrendding: () => {
        return axiosConfig.get(`/search/trending`);
    },
    get_public_companies: (id) => {
        return axiosConfig.get(`/companies/public_treasury/${id}`);
    },
    get_Search_coin: (id) => {
        return axiosConfig.get(`/search?query=${id}`);
    },
}