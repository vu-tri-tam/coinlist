import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Wizard, Steps, Step } from 'react-multistep-wizard';
import Step1 from '../component/Step/step';
import Step2 from '../component/Step/step2';
import Step3 from '../component/Step/step3';
import Step4 from '../component/Step/Step4';
import { useDispatch } from 'react-redux';
import { VerifyKYC } from '../feature/VerifyKYC';
import { verify } from 'jsonwebtoken';
import AxiosConfigSever from '../Api/callAPI/callApi';

export default function ModalVerify({ show, handleClose }) {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()

    const [nuevo, setNuevo] = useState({
        contries: "",
        cccdFrontSide: "",
        cccdBackSide: "",
        scanFace: "",
        QRcode: ""
    });

    useEffect(() => {
        const getDateFromUser = async () => {
            await AxiosConfigSever.getUserLogin()?.then(res => setUsers(res?.data?.users))
        }
        getDateFromUser()
    }, [])
    const submitFinished = async () => {
        const actions = VerifyKYC(nuevo)
        dispatch(actions)
        await AxiosConfigSever.postInfoUserAffterVerify(nuevo)
    }
    console.log(nuevo, 'noe');
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <Wizard>
                        <Steps>
                            <Step>
                                {ctx => (
                                    <Step1 ctx={ctx} setNuevo={setNuevo} nuevo={nuevo} />
                                )}
                            </Step>
                            <Step>
                                {ctx => (
                                    <Step2 ctx={ctx} setNuevo={setNuevo} nuevo={nuevo} />


                                )}
                            </Step>
                            <Step>
                                {ctx => (
                                    <Step3 ctx={ctx} setNuevo={setNuevo} nuevo={nuevo} />


                                )}
                            </Step>
                            <Step>
                                {ctx => (
                                    <Step4 submitFinished={submitFinished} handleClose={handleClose} />


                                )}
                            </Step>
                        </Steps>
                    </Wizard>
                </Modal.Body>

            </Modal>
        </div>
    )
}
