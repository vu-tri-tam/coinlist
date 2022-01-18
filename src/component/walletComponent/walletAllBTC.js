import React from 'react'

export default function walletAllBTC({ state }) {
    return (
        <div className="price-all-wallet">
            <div className="price-all-container d-flex">
                <div className="price-all-box ">
                    <p>Giá trị ước tính</p>
                    <div className="price-box">
                        <p>{state !== true ? "*****" : 0.00000}</p>
                        <span>BTC</span>
                    </div>

                    <p>~<span>0</span>$</p>
                </div>
                <div className="price-all-box ">
                    <p>Tổng lãi suất đã nhận</p>
                    <div className="price-box">
                        <p>{state !== true ? "*****" : 0.00000}</p>
                        <span>BTC</span>
                    </div>

                    <p>~<span>0</span>$</p>
                </div>
                <div className="price-all-box ">
                    <p>Thu nhập giành được hôm nay</p>
                    <div className="price-box">
                        <p>{state !== true ? "*****" : 0.00000}</p>
                        <span>BTC</span>
                    </div>

                    <p>~<span>0</span>$</p>
                </div>
                <div className="price-all-box">
                    <p>Phần thưởng quỹ</p>
                    <div className="price-box">
                        <p>{state !== true ? "*****" : 0.00000}</p>
                        <span>BTC</span>
                    </div>

                    <p>~<span>0</span>$</p>
                </div>
            </div>
        </div>
    )
}
