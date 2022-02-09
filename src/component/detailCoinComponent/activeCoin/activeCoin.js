import React, { useEffect, useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs';
import Tooltip from '../../../comon/toolTips'
import { AxiosConfig } from '../../../Api/configAxios';
export default function ActiveCoin({ e, choosePrice, countPrice, coins, handleChoosePrice, handlePrice }) {
    const [state, setstate] = useState(false)
    // useEffect(() => {
    //     const getStableCoin = async () => {
    //         await AxiosConfig.getAllCoinTop()?.then((res) => setCoins(res?.data))

    //     }
    //     getStableCoin()
    // }, [])
    // console.log(choosePrice);
    // const [assetTotalUser, setAssets] = useState()
    // const getUserIdChange = localStorage.getItem('account')
    // useEffect(() => {
    //     const getDateFromUser = async () => {
    //         try {
    //             if (loginUser.length > 0) {
    //                 await AxiosConfigUser.getUserLogin()?.then(res => setAssets(res?.data?.users))
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }


    //     }
    //     getDateFromUser()
    //     console.log('ass');
    // }, [getUserIdChange])
    return (
        <div className={`detail-right-swap`}>
            <div className="detail-right-coin d-flex">
                <div className="d-flex text-left p-2" style={{ flexGrow: "2" }}>
                    <div className="chart-coin ">
                        <img src={e?.image} />
                    </div>
                    <div className="d-flex flex-column name-chart">
                        <p className="name-coin">{e?.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <div className="detail-right-form p-2">
                    <input type="text" defaultValue={1.00} onChange={(ele) => handlePrice(ele.target.value)} className="fomat-input " style={{ outline: "none" }} />
                </div>
            </div>
            <div className="swap-arrow mt-3 mb-3">
                <div className="arrow-container p-2 text-center">
                    <span><BsArrowDownUp /></span>

                </div>
            </div>
            <div className="detail-right-coin d-flex">
                <div className="d-flex text-left p-2" style={{ flexGrow: "2", alignItems: "center" }}>

                    <div className="d-flex name-chart">
                        {
                            choosePrice?.img !== "" ? <img src={choosePrice?.img} width="30" height="30" /> : null
                        }
                        <p className="name-coin">
                            <div className="btn-group">
                                <span type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {choosePrice.name || "Chọn loại tiền"}
                                </span>
                                <ul className="dropdown-menu ">
                                    {
                                        coins?.map((e, i) => {
                                            {/* console.log(e?.symbol.slice(0, 3)) */ }
                                            if (e?.symbol.slice(0, 3) == "usd") {

                                                return <li className="w-100 d-flex p-2" onClick={() => handleChoosePrice(e?.id)}>
                                                    <a className='mx-2' >   <img src={e?.image} width="30" height="30" /></a>
                                                    <p>{e?.name}</p>
                                                </li>
                                            } else {
                                                return
                                            }


                                        }

                                        )}


                                </ul>
                            </div>
                        </p>
                    </div>
                </div>
                <div className="detail-right-form p-2">
                    <input type="text" Value={countPrice || 0} className={`fomat-input border-0 ${choosePrice.name === "" ? "d-none" : "d-block"}`} style={{ outline: "none" }} />
                </div>
            </div>
            <div style={{ position: "relative" }}>
                <h5 className="mt-5 d-flex" style={{ alignItems: "center" }}>1 {e?.symbol.toUpperCase()}<span>=</span>{e?.current_price.toLocaleString()}<span>$</span></h5>
                <p>Rate is for only reference only 2 year ago</p>
                <button className="btn btn-primary w-100 mt-3" disabled={countPrice !== 0 ? false : true} onClick={() => setstate(!state)}>
                    Buy {e?.symbol.toUpperCase()}
                </button>
                <Tooltip show={state} setstate={setstate} e={e} coins={coins} />



            </div>
        </div>
    )
}
