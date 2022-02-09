import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import AxiosConfigSever from "../../Api/callAPI/callApi"
import notification from "../../comon/notification/notification"
import {

    // Link,
    useRouteMatch,
    useHistory

} from "react-router-dom";
import backgroundlogin from '../../asset/images/Future-of-the-Internet.png';

import { AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function SignUp() {

    const [signUp, setSignUp] = useState({})
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const handleRegister = (field, value) => {

        setSignUp({ ...signUp, [field]: value })
    }

    const handleSubmitRegister = async () => {

        try {
            if (!signUp?.userName || !signUp?.passWord) {
                notification.error('Điền đầy đủ thông tin dùm đi bạn')
            }
            else if (signUp.passWord !== signUp.confirmPass) {
                notification.error('Xác nhận mật khẩu không khớp')
            }
            else {
                const response = await AxiosConfigSever.postUserRegister(signUp);
                if (response?.data?.success) {
                    notification.success('Tạo tài khoản thành công')
                    setTimeout(() => {
                        history.push('/login-page')
                    }, 1000);
                }
            }

        } catch (error) {
            console.log(error);
            notification.error('Có vẻ như xảy ra lỗi liên quan đến internet')
        }
    }
    return (
        <div className={"bg-all p-2"}>
            <div className='img-bg w-100 h-100'>
                <img src={backgroundlogin} alt="" />
            </div>

            <div className="login-container shadow-sm p-3  bg-body rounded">
                <div to="/" className="w-100 titlbracum-left d-flex mb-3">
                    <span className=""><img src="./images/pols.png" width={30} height={30} /></span>
                    <h5 className="">Sign up to PolkastaterCoin</h5>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><span className="mx-2"><FiUser /></span>Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => handleRegister('userName', e.target.value)} />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><span className="mx-2"><RiLockPasswordLine /></span>Password</label>
                        <div className='container_all_pass'>
                            <input type={show ? `text` : `password`} className="form-control" id="exampleInputPassword1" onChange={(e) => handleRegister('passWord', e.target.value)} />
                            <span className='mx-2 show_pass'>{show ? <AiOutlineEye onClick={() => setShow(false)} /> : <AiOutlineEyeInvisible onClick={() => setShow(true)} />}</span>
                        </div>
                        {/* <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleRegister('passWord', e.target.value)} /> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><span className="mx-2"><RiLockPasswordLine /></span> Confirm Password</label>
                        <div className='container_all_pass'>
                            <input type={showConfirmPass ? `text` : `password`} className="form-control" id="exampleInputPassword1" onChange={(e) => handleRegister('confirmPass', e.target.value)} />
                            <span className='mx-2 show_pass'>{showConfirmPass ? <AiOutlineEye onClick={() => setShowConfirmPass(false)} /> : <AiOutlineEyeInvisible onClick={() => setShowConfirmPass(true)} />}</span>
                        </div>
                        {/* <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleRegister('confirmPass', e.target.value)} /> */}
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>

                    <button type="button" className="btn btn-info w-100 text-white" onClick={() => handleSubmitRegister()}>Submit</button>
                    <div className="css-6dudwv mb-5 mt-2 text-center">Already have an account?<a className="chakra-link css-1drmvzi" href="/login-page">Login</a></div>

                </form>

            </div>
        </div>

    )
}

