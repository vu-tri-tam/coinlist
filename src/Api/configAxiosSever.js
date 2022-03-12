import axios from "axios"
// import jwt_decode from "jwt-decode";

const tokenfake = localStorage.getItem("account")
// console.log(tokenfake, 777);

const axiosSever = axios.create({
    baseURL: "https://polkastarter-sever.herokuapp.com",
    headers: { 'Authorization': "Bearer " + tokenfake }
})

axiosSever.interceptors.response.use(function (response) {
    // console.log(response);
    return response;

}, function (error) {
    if (error.response !== undefined && error.response.status === 403) {
        console.log("error", error.response);
        // window.location.href = "/login-page"
    }
});

export default axiosSever

