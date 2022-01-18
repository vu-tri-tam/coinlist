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
export default function SignUp() {

    const [signUp, setSignUp] = useState({})
    const history = useHistory()

    const handleRegister = (field, value) => {

        setSignUp({ ...signUp, [field]: value })
    }

    const handleSubmitRegister = async () => {

        try {
            if (signUp.passWord !== signUp.confirmPass) {
                notification.error('Xác nhận mật khẩu không khớp')
            } else {
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
        }
    }
    return (
        <div className="bg-all">
            <div className="login-container shadow-sm p-3 mb-5 bg-body rounded">
                <h5 className="mb-5">Sign up to Polkastater</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><span className="mx-2"><FiUser /></span>Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => handleRegister('userName', e.target.value)} />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><span className="mx-2"><RiLockPasswordLine /></span>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleRegister('passWord', e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><span className="mx-2"><RiLockPasswordLine /></span> Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleRegister('confirmPass', e.target.value)} />
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

