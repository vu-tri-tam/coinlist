import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import eventIMG from '../asset/images/Cac-tinh-nang-chu-chot-cua-san-giao-dich-phi-tap-trung-Polkastarter.jpg'
export default function PopupEvent() {
    const [state, setstate] = useState(false)
    // console.log(state);
    return (
        <div className={`popup-event ${state ? 'd-none' : 'd-block'}`}>

            <div className="popup-container">
                <IoClose className="close-btn" onClick={() => setstate(true)} />
                <img src={eventIMG} alt="" />
            </div>

        </div>

    )
}
