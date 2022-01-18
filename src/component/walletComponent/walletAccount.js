import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';

export default function WalletAccount({ state, user_And_Wallet }) {
    // const [total_wallet, setTotalWallet] = useState()
    const total = user_And_Wallet[0] && user_And_Wallet[0]?.wallet?.reduce((total, item) =>
    (
        // console.log(item.total_swap * item.current_Price, 8787)
        total + item.total_swap * item.current_Price
    ), 0)
    // const auth = useSelector(state => state.auth)


    useEffect(() => {
        console.log(user_And_Wallet?._id, 'user thay đổi nha');
        console.log(user_And_Wallet, 'user');
    }, [user_And_Wallet?._id])

    return (
        <div className="price-all-wallet">
            <div className="price-all-container d-flex">
                <div className="price-all-box ">
                    <p>Tổng giá trị tài sản</p>
                    <div className="price-box">
                        <p>{state !== true ? "*****" : `~ ${total && total.toFixed(2) || 0}`} <span>$</span></p>

                    </div>


                </div>

            </div>
        </div>
    )
}
