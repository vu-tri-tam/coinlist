import React, { useState, useEffect } from 'react'
// import Form from 'react-bootstrap/Form'
import imgKYC from '../../asset/images/Customer-Due-Diligence-CDD.jpg'
import success from '../../asset/images/76649-checked.gif.crdownload'
import { Button, FloatingLabel } from 'react-bootstrap';
import { BsPersonCheck, BsCheckCircleFill } from 'react-icons/bs';
import Loading from '../../comon/loading';
import ConfettiReact from "../../comon/confetti/confetti"
// import { BsCheckCircleFill } from 'react-icons/fc';



export default function Step({ submitFinished, handleClose }) {

    const [state, setstate] = useState(false)
    const [loading, setLOading] = useState(false)
    const handleFinishedData = () => {
        setLOading(true)

        setTimeout(() => {
            submitFinished()
            setstate(true)
            setLOading(false)
        }, 2000);

    }
    // console.log(state);
    return (
        <>
            <div className="" >


                <div className="text-center mb-5" >
                    {
                        state ?
                            <div>
                                {/* <a href="https://lottiefiles.com/76649-checked"></a> */}
                                <img src={loading !== true ? success : ""} alt="" width={100} height={100} />
                                {/* <BsPersonCheck style={{ background: "#f6f6f6", borderRadius: "50%", padding: "9%", fontSize: "7rem", color: "green" }} /> */}
                                <h5 className="mb-5">Đã hoàn tất xác thực kyc <br />đang trong trạng thái kiểm duyệt </h5>
                                <div className="mt-6" style={{ textAlign: "center" }}>
                                    <p><span><BsCheckCircleFill /></span> Quốc gia</p>
                                    <p><span><BsCheckCircleFill /></span> căn cước công dân</p>
                                    <p><span><BsCheckCircleFill /></span> xác thực QR code</p>
                                </div>
                            </div> :
                            <img src={imgKYC} className="w-100" />
                    }

                </div>

                {
                    state ? <Button variant="primary" onClick={() => handleClose(false)} className="w-100 ">
                        về trang chính
                    </Button> : <Button variant="primary" onClick={() => handleFinishedData()} className="w-100 ">
                        {
                            loading ? <div style={{ width: "0", margin: "0 auto", padding: "0 0 1% 0" }}><Loading type="spinningBubbles" color="white" width={20} height={20} /> </div> : "Hoàn thành xác minh"
                        }
                    </Button>
                }


            </div>
            {
                state ? <ConfettiReact /> : null
            }
        </>

    )
}
