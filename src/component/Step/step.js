import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import imgKYC from '../../asset/images/Customer-Due-Diligence-CDD.jpg'
import { Button, FloatingLabel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { verifySlice } from '../../feature/VerifyKYC';

export default function Step({ ctx, setNuevo, nuevo }) {
    // const initialState = {
    //     contries: null
    // }
    // const [contries, setContries] = useState(initialState)
    // console.log(nuevo, 77);


    const dispatch = useDispatch()

    const handleContries = (event) => {
        setNuevo({
            ...nuevo,
            contries: event
        })

    }



    return (
        <div className="" style={{ height: "30rem" }}>
            <h5 className="mb-3">Chào mừng đến với KYC trên POLS</h5>
            <p className="mb-3">This helps us determine the best way to verify your identity.</p>
            <div className="text-center mb-3" >
                <Form.Select aria-label="Default select example" onChange={(e) => handleContries(e.target.value)}>
                    <option>Chọn quốc gia</option>
                    <option value="Vietnam">Viet nam</option>
                    <option value="English">English</option>
                    <option value="China">China</option>
                </Form.Select>
            </div>
            <div className="text-center mb-5" >
                <img src={imgKYC} className="w-100" />
            </div>
            <Button variant="primary" onClick={ctx.next} className="w-100 ">
                Tiếp tục
            </Button>
        </div>

    )
}
