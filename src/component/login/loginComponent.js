import React, { useState, useEffect } from 'react'
import { Example } from '../../comon/reactRangerSlick'
import { AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';

import {

    // Link,
    useRouteMatch,
    useHistory

} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginForm } from '../../feature/Auth'
import AxiosConfigSever from "../../Api/callAPI/callApi"
import notification from "../../comon/notification/notification"
// import checkAuth from "../../Api/checkAuthToken"
import jwt_decode from "jwt-decode";
import Loading from '../../comon/loading';
import backgroundlogin from '../../asset/images/Future-of-the-Internet.png';
import LoadingAnimation from '../../comon/loading';
export default function LoginComponent() {

    const match = useRouteMatch()
    const pathFormat = match.path.slice(1, 12)
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.user)
    const history = useHistory()
    const [color, setColor] = useState(0)
    const [login, setLogin] = useState(null)
    const [countErrorLogin, setCountError] = useState(0)
    const [countDownLogin, setDownLogin] = useState(15)
    const [verifyCountErrorLogin, setVerifyError] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleLogin = (field, value) => {
        setLogin({
            ...login,

            [field]: value
        })
    }



    const useCountDown = (start) => {
        const [counter, setCounter] = useState(start);
        useEffect(() => {
            if (counter === 0) {
                setCountError(0)
            }
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }, [counter]);
        return counter;
    };

    const Countdown = ({ seconds }) => {
        const timeLeft = useCountDown(seconds);
        return <div>{`Thử lại sau (${timeLeft})`}s</div>;
    }

    const handleSubmitLogin = async () => {

        try {

            if (!login?.userName || !login?.passWord) {
                notification.error('Làm ơn nhập đầy đủ thông tin')
            }
            const response = await AxiosConfigSever.postUserLogin(login)
            const decodeUser = jwt_decode(response?.data?.accessToken)
            // console.log(response, 'res');
            if (response?.data?.success) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    notification.success('Đăng nhập thành công')

                    const action = loginForm({ ...login, id: decodeUser?.userId, verify: decodeUser?.verify, role: decodeUser?.role, wallet: decodeUser?.wallet })
                    dispatch(action)
                    localStorage.setItem('account', response?.data?.accessToken)
                    // setTimeout(() => {
                    history.push('/')
                    // }, 1000);
                }, 2000);



            } else {
                notification.error('Vui lòng kiểm tra lại username và password')

            }
        } catch (error) {
            notification.error('Vui lòng kiểm tra lại username và password')
            setCountError(countErrorLogin + 1)
            console.log(error);

        }

    }
    // console.log(countErrorLogin);
    return (
        <>
            <div className={`${pathFormat === "login-page" ? "bg-all p-2 mt-5" : ""}`}>
                <div className={`img-bg w-100 h-100 ${loading ? "img-bg-animation" : null}`}>
                    {
                        loading ? <div className='bg-animation'><LoadingAnimation type="spinningBubbles" color="white" width={20} height={20} className="loading-animation" /></div> : null
                    }
                    <img src={backgroundlogin} alt="" />
                </div>

                <div className={`login-container shadow-sm p-3  bg-body rounded ${loading ? "login-animation" : null}`}>
                    <div to="/" className="w-100 titlbracum-left d-flex mb-3">
                        <span className=""><img src="./images/pols.png" width={30} height={30} /></span>
                        <h5 className="">Login to PolkastaterCoin</h5>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label"><span className="mx-2"><FiUser /></span>Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => handleLogin('userName', e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"><span className="mx-2"><RiLockPasswordLine /></span>Password</label>
                            <div className='container_all_pass'>
                                <input type={show ? `text` : `password`} className="form-control" id="exampleInputPassword1" onChange={(e) => handleLogin('passWord', e.target.value)} />
                                <span className='mx-2 show_pass'>{show ? <AiOutlineEye onClick={() => setShow(false)} /> : <AiOutlineEyeInvisible onClick={() => setShow(true)} />}</span>
                            </div>

                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                        </div>

                        <div className={`mb-3 ranger-verify`}>
                            {
                                color === 100 ? null : <AiOutlineCheckCircle onClick={() => setColor(color + 50)} style={{ position: "absolute" }} />
                            }


                            <Example number={color} />



                        </div>
                        <div className="mb-3" >
                            <p className='text-danger w-100'>{color === 100 || color === 0 ? null : `Thêm một chút nữa`}</p>
                        </div>
                        <button type="button" className="btn btn-info w-100 text-white" disabled={color < 100 || countErrorLogin >= 5 ? true : false} onClick={() => handleSubmitLogin()}>{countErrorLogin >= 5 ? <Countdown seconds={15} /> : "Submit"}</button>
                        <div className="css-6dudwv mb-5 mt-2 text-center">Already have an account?<a className="chakra-link css-1drmvzi" href="/sign-up">Sign up</a></div>

                    </form>

                </div>
            </div>

        </>
    )
}
