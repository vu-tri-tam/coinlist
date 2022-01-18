import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Loading from './loading'
import notification from '../comon/notification/notification'
// import Button from 'react-bootstrap/Button'
// import Component from './reactCamera/reactCamera'
// import { useHistory } from "react-router-dom";
export default function ModalVerifyCamera({ show, handleClosePopUp, src, setNuevo, nuevo, handleClose }) {
    const [loading, setLoading] = useState(false)
    // const nextStep = () => ctx.next
    // let history = useHistory();

    const handleSubmit = (status) => {
        setLoading(status)

        setTimeout(() => {
            setLoading(!status)
            setNuevo({ ...nuevo, scanFace: src })
            notification.success('Tải lên thành công')
            handleClose(false)
        }, 2000);

        // history.push('/verify-page')
        // nextStep()
    }
    // console.log(imgSrc, 4545);
    return (
        <div>
            <Modal show={show} fullscreen={true} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Camera</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className={`position-relative ${loading ? "bg-loading " : ""}`} style={{ width: "50%", margin: "0 auto", position: "relative" }}>

                        {
                            loading ?
                                <div style={{ position: "absolute", top: "46%", left: "47%" }}> <Loading type="bubbles" color="white" /></div> : null
                        }
                        {src && (
                            <img
                                src={src}
                                className="w-100"
                                alt=""
                            />
                        )}

                    </div>
                    <div style={{ width: "50%", margin: "0 auto", position: "relative" }}>
                        <button className="access-img btn btn-primary" onClick={() => handleSubmit(true)}>Sử dụng ảnh này</button>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}
