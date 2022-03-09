import axiosSever from "../configAxiosSever";

const AxiosConfigSever = {
    getQuantityLikeByUserLogin: () => {
        return axiosSever.get('/api/like_author');
    },
    postLikeByUserLogin: (data) => {
        return axiosSever.post('/api/like_author', data);
    },
    deleteLikeByUserLogin: (id) => {
        return axiosSever.delete(`/api/like_author/${id}`);
    },
    postCommentByUserLogin: (data) => {
        return axiosSever.post('/api/comment_user', data);
    },
    getCommentByUserLogin: () => {
        return axiosSever.get('/api/comment_user');
    },
}
export default AxiosConfigSever