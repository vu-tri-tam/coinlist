import React, { useState, useEffect } from 'react'
import FileBase64 from 'react-file-base64';
import Loading from "../loading";
import { IoMdAdd } from 'react-icons/io';
// import { AiOutlineDelete, AiOutlineCloudUpload } from 'react-icons/ai';
import notification from "../notification/notification";
import { Wizard, Steps, Step } from 'react-multistep-wizard';
import ModalVerifyCamera from '../modalVerifyCamera';
import Component from '../reactCamera/reactCamera';

export default function ReactBase64({ setNuevo, nuevo, handleClose }) {
    const [state, setstate] = useState({
        filesFE: [],
        filesBE: [],
    })
    const [loading, setLoading] = useState(false);
    const [stepVerify, setSteps] = useState(false);
    // Callback~
    const getFilesFE = (files) => {
        setstate({ ...state, filesFE: files })
    }
    const getFilesBE = (files) => {
        setstate({ ...state, filesBE: files })
    }

    useEffect(() => {

    }, [stepVerify])

    const handleSubmitFE = () => {
        setLoading(true)

        setTimeout(() => {
            notification.success('Tải lên thành công')
            setLoading(false)
            // setSteps(true)
            // handleClose(false)
        }, 2000);
        setNuevo({ ...nuevo, cccdFrontSide: state?.filesFE[0]?.base64 })



    }
    const handleSubmitBE = () => {
        setLoading(true)

        setTimeout(() => {
            notification.success('Tải lên thành công')
            setLoading(false)
            setSteps(true)
            // handleClose(false)
        }, 2000);
        setNuevo({ ...nuevo, cccdBackSide: state?.filesBE[0]?.base64 })



    }
    console.log(state?.filesFE, 898);
    return (

        <div className="upload__image-wrapper">

            <Wizard>
                <Steps>
                    <Step>
                        {ctx => (
                            <div className="image-item mt-3">
                                <h1>Mặt trước</h1>
                                <div className=" mb-3">

                                    <FileBase64
                                        multiple={true}
                                        onDone={getFilesFE} />

                                </div>
                                <div className='w-100'>
                                    <img src={state?.filesFE[0]?.base64} alt="" className='w-100' />
                                </div>

                                <div className='d-flex'>
                                    {
                                        state?.filesFE.length > 0 ? <button className="btn btn-info text-white w-100  m-3" onClick={() => handleSubmitFE()}>  {
                                            loading ? <Loading type="spinningBubbles" color="white" width={20} height={20} /> : "Sử dụng ảnh này"
                                        }</button> : null
                                    }

                                    <button className="btn btn-info text-white  w-100  m-3" onClick={() => ctx.next()} disabled={!state?.filesFE.length}>
                                        Mặt sau

                                    </button>
                                </div>


                            </div>
                        )}
                    </Step>
                    <Step>
                        {ctx => (
                            <div className="image-item mt-3">
                                <h5>Mặt sau</h5>
                                <div className=" mb-3">
                                    <IoMdAdd />
                                    <FileBase64
                                        multiple={true}
                                        onDone={getFilesBE} />

                                </div>
                                <div className='w-100'>
                                    <img src={state?.filesBE[0]?.base64} alt="" className='w-100' />
                                </div>
                                <div className='d-flex'>
                                    {
                                        state?.filesBE?.length > 0 ? <button className="btn btn-info w-100 m-2" onClick={() => handleSubmitBE()}>  {
                                            loading ? <Loading type="spinningBubbles" color="white" width={20} height={20} /> : "Sử dụng ảnh này"
                                        }</button> : null
                                    }
                                    <button className="btn btn-info w-100 m-2" onClick={() => ctx.next()} disabled={!state?.filesBE?.length}>Chụp mặt</button>

                                </div>

                            </div>



                        )}
                    </Step>
                    <Step>
                        {ctx => (
                            <Component setNuevo={setNuevo} nuevo={nuevo} handleClose={handleClose} />



                        )}
                    </Step>
                </Steps>
            </Wizard>




        </div>
    )
}
