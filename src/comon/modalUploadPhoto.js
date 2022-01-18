import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Loading from './loading'
import ReactBase64 from './uploadPhoto/reactBase64'
import UploadImages from './uploadPhoto/uploadPhoto'
// import Button from 'react-bootstrap/Button'
// import Component from './reactCamera/reactCamera'

export default function ModalUploadPhoto({ show, handleClose, setNuevo, nuevo }) {
    const [loading, setLoading] = useState(false)
    const [close, setClose] = useState(false)

    const handleCloseSelectImg = (status) => {
        setClose(!status)
        // setLoading(status)
        // setTimeout(() => {
        //     setLoading(!status)
        // }, 2000);

    }
    // console.log(imgSrc, 4545);
    return (
        <div>
            <Modal show={show} fullscreen={true} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`position-relative bg-uploadphoto`} style={{ width: "50%", margin: "0 auto", position: "relative" }}>
                        {/* <UploadImages setNuevo={setNuevo} nuevo={nuevo} handleClose={handleClose} /> */}
                        <ReactBase64 setNuevo={setNuevo} nuevo={nuevo} handleClose={handleClose} handleCloseSelectImg={handleCloseSelectImg} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
