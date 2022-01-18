import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Loading from "../loading";
import ModalVerifyCamera from "../modalVerifyCamera";

const Component = ({ setNuevo, nuevo, handleClose }) => {
    // const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState(false)
    const handleClosePopUp = (status) => {
        setPopup(status)
    }
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);


    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        await setImgSrc(imageSrc);
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setPopup(true)
        }, 2000);

    }, [webcamRef, setImgSrc]);

    return (
        <div className={`w-100 `}>
            <div className={`position-relative ${loading ? "bg-loading " : ""}`}>
                {
                    loading ? <div> {imgSrc && (
                        <img
                            src={imgSrc}
                            className="w-100"
                            alt=""
                        />
                    )}</div> : <Webcam
                        audio={false}
                        ref={webcamRef}
                        className="w-100"
                        screenshotFormat="image/jpeg"
                    />
                }


                <div class="photo-button " onClick={capture} style={{ position: "absolute" }}>
                    <div class="circle"></div>
                    <div class="ring"></div>
                </div>
                {
                    loading ? <div style={{ position: "absolute", top: "46%", left: "47%" }}> <Loading type="spinningBubbles" color="red" width={60} height={60} /> </div> : <ModalVerifyCamera src={imgSrc} show={popup} handleClosePopUp={handleClosePopUp} handleClose={handleClose} setNuevo={setNuevo} nuevo={nuevo} />
                }

            </div>


        </div>
    );

}

export default Component;