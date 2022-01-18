import React, { useState } from 'react'
import imgKYC from '../../asset/images/images.png'
import { Button, FloatingLabel } from 'react-bootstrap';
import { GrPrevious } from 'react-icons/gr';
import Camera from '../../comon/reactCamera/reactCamera';
import ModalVerifyCamera from '../../comon/modalVerifyCamera';
import UploadImages from '../../comon/uploadPhoto/uploadPhoto';
import ModalUploadPhoto from '../../comon/modalUploadPhoto';
// import SmsVerify from '../../comon/smsVerify';
export default function Step2({ ctx, setNuevo, nuevo }) {
    const [state, setstate] = useState(false)
    const [upload, setUpload] = useState(false)
    const handleShowUpload = (status) => {
        setUpload(status)
    }

    return (
        <div>

            <div className="mb-2" >

                <GrPrevious onClick={ctx.previous} className="mb-4" />

                <h4 className="mb-3">Chụp hộ chiếu</h4>
                <p className="mb-3">Take a clear photo of the front of your government ID. Make sure lighting is good and any lettering is clear before uploading. For best results, please use a mobile device.</p>
                {
                    state === true ? null : <div className="text-center" >

                        <img src={imgKYC} className="w-90 mb-4 h-50 text-center" />
                    </div>
                }

                {/* {
                    state === true ? null : <Button variant="primary" onClick={() => {

                        setstate(true)
                    }}
                        className="w-100 mb-2">
                        chụp ảnh
                    </Button>
                } */}

                {/* 
                {
                    state === true ? <div className="text-center" ><Camera setNuevo={setNuevo} nuevo={nuevo} ctx={ctx} /></div> : null
                } */}
                {/* {
                    upload ? <UploadImages /> : null
                } */}
                {
                    state === true ? null : <Button variant="primary" className="w-100 mb-2" onClick={() => setUpload(true)}>
                        Upload a photo

                    </Button>
                }
                {
                    state !== true ? null : <Button variant="primary" onClick={() => setstate(false)} className="w-100 mb-2">
                        hủy bỏ
                    </Button>
                }
                {
                    state === true ? null : <Button variant="primary" onClick={ctx.next} className="w-100 mb-2">
                        Tiếp tục
                    </Button>
                }
                <ModalUploadPhoto show={upload} handleClose={handleShowUpload} setNuevo={setNuevo} nuevo={nuevo} />

            </div>




        </div>
    )
}
