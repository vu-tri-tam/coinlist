import React, { useState, useEffect } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import {

    NavLink,
    useRouteMatch,

} from "react-router-dom";
import ModalVerify from '../../comon/modal';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import AxiosConfigUser from "../../Api/callAPI/callApi"
import AxiosConfigSever from '../../Api/callAPI/calApiCoin';
import Timer from '../../comon/coundownEvent';
// import jwt_decode from "jwt-decode";
import { VerifyKYC } from '../../feature/VerifyKYC';
export default function VerifyComponent() {
    const [state, setstate] = useState(false)
    const [coinMe, setCoinme] = useState(false)
    const [user, setUser] = useState(false)
    const [userVerify, setUserVerify] = useState()// nếu xử lí và lưu một kết quả nào đó mà không bị thừa data mỗi khi save thì nên để state là ()
    // console.log(userVerify, 77766);
    // useEffect(() => {
    //     const handleSubmitLogin = async () => {

    //         try {
    //             const response = await AxiosConfigSever.getUserLogin()

    //         } catch (error) {
    //             console.log(error);

    //         }

    //     }
    //     handleSubmitLogin()
    // }, [])
    // useEffect(() => {

    // }, [coinMe[0]])

    const dispatch = useDispatch()
    const authUser = useSelector(state => state.auth)
    const verifyUser = useSelector(state => state.verify)
    useEffect(() => {
        const handleSupplyCoin = async () => {
            try {
                await AxiosConfigSever.getCoin()?.then(res => setCoinme(res?.data?.tokenMe))
                await AxiosConfigUser.getUserLogin()?.then(res => setUser(res?.data?.users))
                await AxiosConfigUser.getInfoUserAffterVerify()?.then(res => setUserVerify(handleFindIdUserVerify(res?.data?.verifyUser)))
                // setUserVerify(res?.data?.verifyUser)
            } catch (error) {
                console.log(error);
            }



        }
        handleSupplyCoin()
    }, [])

    localStorage.setItem('max_supply', coinMe[0]?.max_supply || 0)

    const handleFindIdUserVerify = (data) => {
        const findUser = data?.findIndex(res => res?.user === authUser[0]?.id)
        // console.log(data, 'datax');
        if (findUser !== -1) {
            if (data[findUser].user !== null && data[findUser].user !== undefined && data[findUser].user !== []) {
                // console.log(data[findUser].user, 'data');
                return {
                    idUser: data[findUser].user
                }
            }

        } else {
            return
        }

    }


    // console.log(userVerify, '888');
    useEffect(() => {
        // const findUser = userVerify?.filter(res => res?.user === authUser[0]?.id)
        // console.log(findUser, 'user');
        // const userID = handleFindIdUserVerify(userVerify)
        // if(userVerify)
        // const findUser = data?.findIndex(res => res?.user === authUser[0]?.id)
        const action = VerifyKYC(userVerify)

        // console.log(action, 'action');
        dispatch(action)
        // console.log(userVerify, '888');

    }, [userVerify, user])

    // console.log(user, 'user');
    // const getLocalUser = localStorage.getItem('account')
    // useEffect(() => {
    //     const handleChangeDataLogin = async () => {

    //         await AxiosConfigSever.getUserLogin()?.then(res => res?.data)

    //         // console.log(decodeJWT, 'DECODE');


    //     }
    //     handleChangeDataLogin()
    // }, [getLocalUser])
    // const verifyUser = useSelector(state => state.verify)
    // console.log(verifyUser[1]?.idUser, 190);
    const handleClose = (status) => {
        setstate(status)
    }
    // const verifyUserKyc = verifyUser ? verifyUser[0].idUser : null

    return (
        <div>
            <div className="container-kyc mt-4">
                <div className="tab-kyc">
                    <ul >
                        <li><NavLink to="/Account" activeStyle={{
                            fontWeight: "bold",
                            color: "blue"
                        }}>Account</NavLink></li>
                        <li><NavLink to="/verify-page" activeStyle={{
                            fontWeight: "bold",
                            color: "blue"
                        }}>Kyc</NavLink></li>
                        <li><NavLink to="/profile" activeStyle={{
                            fontWeight: "bold",
                            color: "blue"
                        }}>Profile</NavLink></li>
                    </ul>
                </div>
                <hr />
                {
                    authUser?.length > 0 ? null : <div style={{ background: "#ff8080", padding: "1%" }}>
                        Vui lòng đăng nhập để bắt đầu quá trình xác minh tài khoản
                    </div>
                }
                {/* <div>
                    <p>addas</p>
                    <img src={userVerify[0]?.cccd || null} width={50} height={50} alt="" />
                </div> */}
                <div className="Identity">
                    <div className="p-4">
                        <h5>Identity Verification</h5>
                        <p className="mb-2">In order to take part in daomaker.com products and services - you have to complete Identity Verification.</p>
                        <button className="rounded-pill btn-primary btn animation-btn" disabled={authUser && authUser[0]?.verify !== false || verifyUser[0]?.idUser === authUser[0]?.id ? true : false} data-hover="Continue kyc" onClick={() => handleClose(true)}>

                            {/* <div>{authUser[0]?.verify !== false ? <div><span className="mx-2"><BsFillPatchCheckFill /></span>Complete kyc</div> : verifyUser[0]?.idUser !== authUser[0]?.id ? "continue kyc" : "pendding"}</div> */}
                            <div>{
                                authUser.length < 0 && verifyUser[0]?.idUser !== authUser[0]?.id ? "continue kyc" :
                                    authUser.length > 0 && authUser[0]?.verify !== true && verifyUser[0]?.idUser === authUser[0]?.id ? "pendding..." :
                                        authUser.length > 0 && authUser[0]?.verify !== false && verifyUser[0]?.idUser === authUser[0]?.id ?
                                            "complete kyc" : "continue kyc"
                            }</div>
                            <span className="mx-2"><AiOutlineArrowRight /></span>
                        </button>
                        <ModalVerify show={state} handleClose={handleClose} />
                    </div>
                </div>
                <div className="Identity">
                    <div className="p-4">
                        <h5>Tổng phân bổ cho sự kiện lần này:<b className="mx-2">{localStorage.getItem('max_supply')}<span className="mx-2">POLSCOIN</span></b></h5>
                        <p className="mb-2">In order to take part in daomaker.com products and services - you have to complete Identity Verification.</p>
                        <Timer />
                    </div>
                </div>
            </div>
        </div>
    )
}
