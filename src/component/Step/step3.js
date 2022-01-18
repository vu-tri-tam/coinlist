import React, { useState } from 'react'
import imgSMS from '../../asset/images/198-1983619_mail-to-sms-enables-the-sending-of-sms.png'
import { Button } from 'react-bootstrap';
import { GrPrevious } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';
import SmsVerify from '../../comon/smsVerify';
import QRcode from '../../comon/QRcode';
import ModalQRcode from '../../comon/modalQRcode';
// import Camera from '../../comon/reactCamera/reactCamera';
export default function Step3({ ctx }) {
    const [state, setstate] = useState(false)
    const [showSMS, setSMS] = useState(false)

    const handleShowQR = (status) => {
        setstate(status)
    }
    const [message, setMessage] = useState({
        message: {
            to: '',
            body: ''
        },
        error: false,
        submitting: false,

    })
    const onHandleChange = (event) => {

        setMessage({
            message: { ...message.message, [event.target.name]: event.target.value }
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage({ submitting: true });
        await fetch('http://localhost:5000/api/messages ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message?.message)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMessage({
                        error: false,
                        submitting: false,
                        message: {
                            to: '',
                            body: ''
                        }
                    });
                } else {
                    setMessage({
                        error: true,
                        submitting: false
                    });
                }
            });
    }

    return (
        <div>

            <div className="mb-5">

                <GrPrevious onClick={ctx.previous} className="mb-4" />

                <h4 className="mb-3">Continue on another device</h4>
                <p className="mb-3">To verify your identity, we need access to a camera. We’ll send you a secure link for continuing on your phone. No app download is required.</p>
                <div className="text-center" style={{ height: "20rem", overflow: "hidden" }}>
                    {
                        state ? <div ><AiOutlineClose style={{ position: "absolute", right: "4rem" }} onClick={() => setstate(false)} /><QRcode /></div> : <img src={imgSMS} className="w-70 h-100 text-center" />
                    }

                </div>


            </div>
            {
                state ? null : <Button variant="primary" className="w-100 mb-2" onClick={() => setSMS(true)}>
                    Send SMS
                </Button>
            }

            {
                showSMS ? <SmsVerify message={message} onHandleChange={onHandleChange} onSubmit={onSubmit} /> : null
            }

            <Button variant="primary" className="w-100 mb-2" onClick={() => setstate(true)}>
                Scan QR Code
            </Button>
            <Button variant="primary" onClick={ctx.next} className="w-100 ">
                Tiếp tục
            </Button>
            {/* {
                state ? <ModalQRcode show={state} handleShowQR={handleShowQR} /> : null
            } */}
        </div>
    )
}
