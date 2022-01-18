import React, { useEffect, useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi';
import Modal from 'react-awesome-modal';
import { Wizard, Steps, Step } from 'react-multistep-wizard';
import warning from '../../asset/images/warning.png'
import success from '../../asset/images/76649-checked.gif.crdownload'
import notification from "../../comon/notification/notification"
import Loading from "../../comon/loading"
export default function AlertCoin({ show, handleShowAlert, countPrice, choosePrice, chooseCoinWallet }) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const handleStep = () => {
        handleShowAlert(false)
        setStep(1)
        notification.success('Hủy thành công')
    }

    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(step + 1)
        }, 2000);

    }

    return (
        <div>
            <Modal
                visible={show}
                width="400"
                // height="500"

                effect="fadeInRight"
                onClickAway={() => handleShowAlert(false)}
            >
                <Wizard
                    externalOverrides={{
                        currentStep: step,
                        jump: p => setStep(p),
                        previous: () => setStep(step => step - 1),
                        next: () => setStep(step => step + 1)
                    }}
                >
                    <Steps>
                        <Step>
                            {ctx => (
                                <div className={`p-3 ${loading ? 'bg-loading' : ""}`}>
                                    {
                                        loading ? <Loading type="spinningBubbles" color="white" width={30} height={30} className="loadingDetail" /> : null
                                    }
                                    <div>

                                        <div className='bg-white w-100 text-center mb-4' >
                                            <img src={warning} alt="new" width={100} height={100} />
                                        </div>
                                        <h6 className='text-center'> Balance reverse: {countPrice} {choosePrice.name.toUpperCase()}</h6>
                                        <p> Đơn vị: {chooseCoinWallet?.name.toUpperCase()}</p>
                                        <p> Phí: 0.025 POLSCOIN</p>
                                        <p> Price: 1 {chooseCoinWallet?.name.toUpperCase()} = {choosePrice?.price} {choosePrice.name.toUpperCase()}</p>
                                        <p> Tổng nhận: {countPrice} {choosePrice.name.toUpperCase()}</p>

                                    </div>
                                    <div className='w-100 mt-4'>
                                        <button className='btn btn-primary w-50' onClick={handleLoading} disabled={loading}>xác nhận</button>
                                        <button className='btn btn-default w-50' onClick={handleStep}>Hủy bỏ</button>
                                    </div>

                                </div>
                            )}
                        </Step>
                        <Step>
                            {ctx => (
                                <div className='p-3'>
                                    <div>
                                        <div className='bg-white w-100 text-center mb-5' >
                                            <img src={success} alt="new" width={80} height={80} style={{ back: "none" }} />
                                            <h5 className='text-center'>Swap succesfully</h5>
                                        </div>

                                        balance reverse: 34534534 BTC
                                        <p>Kiểm tra ví để xem kết quả</p>
                                    </div>
                                    <div className='w-100 mt-4'>

                                        <button className='btn btn-primary w-100' onClick={handleStep}>quay lại</button>
                                    </div>
                                </div>
                            )}
                        </Step>

                    </Steps>
                </Wizard>

                {/* Kiểm tra số dư trong ví */}

            </Modal>
        </div>


    )
}
