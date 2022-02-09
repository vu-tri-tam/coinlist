import React, { useState, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
export default function OffCanvassOption({ filterCoins, show, handleChoosePrice, handleShow, name }) {

    // console.log(filterCoins, 'filter');

    const handleOptionChoose = (id) => {
        handleChoosePrice(id)
        handleShow(false)
    }

    return (
        <div>
            <Offcanvas show={show} onHide={() => handleShow(false)} placement={name}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Chọn đồng coin swap</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='mb-3'>
                        <input type="text" className="form-control" placeholder='Tìm kiếm đồng coin..' />
                    </div>
                    {
                        filterCoins?.length > 0 ? filterCoins?.map((ele, i) => {


                            return <li className="w-100 d-flex p-2" onClick={() => handleOptionChoose(ele?.id || ele?._id)}>
                                <a className='mx-2' ><img src={ele?.image || ele?.image_token} width="30" height="30" /></a>
                                <p>{ele?.name || ele?.name_token}</p>
                            </li>
                        }) : "Chưa có đồng coin nào của bạn"
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
