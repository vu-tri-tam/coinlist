import React from 'react'
import { IoClose } from 'react-icons/io5';

export default function ShowImage({ setShowImg, profilePhoto }) {

    return (
        <>
            <div>
                <div className={`zoom-img `}>
                    <IoClose className="close-btn" onClick={() => setShowImg(false)} />
                    <img src={profilePhoto} alt="" />
                </div>
                <div className='zoom-container'></div>
            </div>


        </>

    )
}
