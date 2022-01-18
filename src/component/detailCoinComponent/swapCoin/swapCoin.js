import React, { useEffect, useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';
import { MdPlayArrow } from 'react-icons/md';
import { AxiosConfig } from '../../../Api/configAxios';
// import Swal from 'sweetalert2'
import AxiosConfigSever from '../../../Api/callAPI/calApiCoin';
import AxiosConfigUser from '../../../Api/callAPI/callApi';
import PageRefresh from './pageRefresh';
import AlertCoin from '../../../comon/alertCoin/alertCoin';
import OffCanvassOption from '../../../comon/offCanvas/offCanvasOption';
// AxiosConfigSever

export default function SwapCoin({ e, coins }) {
    const [filterCoin, setFilter] = useState([])

    const [chooseCoinWallet, setChooseWallet] = useState({
        id: null,
        name: "",
        img: "",
        price: null
    })
    const [user, setUser] = useState()
    const [countPrice, setCountPrice] = useState()
    const [refresh, setRefresh] = useState(false)
    const [alert, setShowAlert] = useState(false)
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [showWallet, setShowWallet] = useState(false);
    // const [coinByRefresh, setCoinRefresh] = useState(false)
    // console.log(countPrice);
    const [choosePrice, setChoose] = useState({
        id: null,
        name: "",
        img: "",
        price: null
    })
    // console.log(chooseCoinWallet?.price, countPrice, 'ịy');
    useEffect(() => {
        const xx = coins?.filter(item => item?.id !== e?.id)
        setFilter(xx)

        const handleGetUserId = async () => {
            await AxiosConfigUser.getUserLogin()?.then(res => setUser(res?.data?.users))

        }
        handleGetUserId()

    }, [])

    const handleShow = (status) => {
        setShow(status)
    }
    const handleShowWallet = (status) => {
        setShowWallet(status)
    }
    const handleChoosePrice = async (id) => {

        const filterName = await coins?.filter((el, idx) => el?.id === id)
        // console.log(id, 999);
        setChoose({
            id: filterName[0]?.id,
            name: filterName[0]?.symbol,
            img: filterName[0]?.image,
            price: filterName[0]?.current_price
        })



    }

    const handleChoosePriceWallet = (id) => {

        const filterName = user?.wallet?.filter((el, idx) => el?._id === id)
        console.log(filterName[0]?.total_swap, 777);
        setChooseWallet({
            id: filterName[0]?._id,
            name: filterName[0]?.name_token,
            img: filterName[0]?.image_token,
            price: filterName[0]?.total_swap,
            current_Price: filterName[0]?.current_Price
        })


    }

    // useEffect(() => {
    //     const getPriceRefresh = async () => {
    //         await AxiosConfig.getCoinById(e?.id)
    //     }
    //     getPriceRefresh()
    // }, [refresh])
    const handleShowAlert = (status) => {
        setShowAlert(status)
    }


    const handleFindCoinSwapFinish = (data, data_Price) => {
        console.log(chooseCoinWallet?.name, "choose");
        const findIdCoinSwapFinish = data?.findIndex((ele) => ele?.name_token === chooseCoinWallet?.name)

        if (findIdCoinSwapFinish !== -1) {

            return data[findIdCoinSwapFinish].total_swap -= data_Price

        }
    }

    const handlePriceCoin = async (coins, data_Price) => {
        handleShowAlert(true)

        const findIdCoinSwapDupplicate = user?.wallet?.findIndex((ele) => ele?.name_token === coins?.name)
        const findIdCoinSwapFinish = user?.wallet?.findIndex((ele) => ele?.name_token === chooseCoinWallet?.name)
        // console.log(user.wallet[findIdCoinSwapFinish].total_swap -= data_Price, '666');
        if (findIdCoinSwapFinish !== -1) {
            user.wallet[findIdCoinSwapFinish].total_swap -= data_Price
        }

        //điều kiện để xử lí mảng wallet 
        if (findIdCoinSwapDupplicate !== -1) {
            user.wallet[findIdCoinSwapDupplicate].total_swap += data_Price
            // handleFindCoinSwapFinish(user.wallet, data_Price)


        } else {

            user?.wallet.push({
                total_swap: data_Price,
                image_token: coins.img,
                name_token: coins.name,
                current_Price: coins.price

            })

        }
        //sau khi xử lí xong ta thay thế mảng hiện tại thành mảng đã xử lí để có kết quả
        console.log({ ...user, wallet: user.wallet }, 65656565);
        await AxiosConfigUser.updateWalletUser(user?._id, { ...user, wallet: user.wallet })




    }

    const handlePrice = (data) => {

        data <= chooseCoinWallet?.price ? setError(false) : setError(true)
        const filterNameById = coins?.filter((el, idx) => el?.id === choosePrice?.id)
        const filterName = coins?.filter((el, idx) => el?.symbol === chooseCoinWallet?.name)
        const priceFinal = data * filterName[0]?.current_price;
        // console.log(filterName, 'data');
        setCountPrice(
            priceFinal / filterNameById[0]?.current_price
        )
    }

    return (
        <div className={`detail-right-swap `}>
            <p>Số dư khả dụng: {chooseCoinWallet?.price ? chooseCoinWallet?.price.toFixed(4) : chooseCoinWallet?.price || 0}</p>
            <div className="detail-right-coin d-flex mt-4">
                <div className="d-flex text-left p-2" style={{ flexGrow: "2" }}>
                    <div className="chart-coin ">
                        <img src={chooseCoinWallet?.img} />
                    </div>
                    <div className="d-flex  name-chart">
                        <a className=" d-flex" style={{ alignItems: "center" }} onClick={() => handleShowWallet(true)}>
                            <p className="name-coin">{chooseCoinWallet?.name || "Chọn loại tiền"}</p>
                            <MdPlayArrow />
                        </a>

                    </div>
                </div>
                <div className="detail-right-form p-2">
                    <input type="text" defaultValue={1.00 || chooseCoinWallet?.price} onChange={(ele) => handlePrice(ele.target.value)} className={`fomat-input ${chooseCoinWallet.name !== "" ? 'd-block' : 'd-none'}`} style={{ outline: "none" }} />

                </div>

            </div>
            {
                error ? <div className='errorInput'>
                    <RiErrorWarningLine /> <p>Số lượng phải nhỏ hơn hoặc đúng số dư</p>
                </div> : null
            }

            <div>
                <p>max: {chooseCoinWallet?.price ? chooseCoinWallet?.price.toFixed(4) : chooseCoinWallet?.price || 0}</p>
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

                                <a className="d-flex" style={{ alignItems: "center" }} onClick={() => handleShow(true)}>
                                    <p>{choosePrice.name || "Chọn loại tiền"}</p>
                                    <MdPlayArrow />
                                </a>
                                <OffCanvassOption filterCoins={filterCoin} show={show} name="end" handleShow={handleShow} handleChoosePrice={handleChoosePrice} />
                                <OffCanvassOption filterCoins={user?.wallet} show={showWallet} name="end" handleShow={handleShowWallet} handleChoosePrice={handleChoosePriceWallet} />

                            </div>
                        </p>
                    </div>
                </div>
                <div className="detail-right-form p-2">
                    <input type="text" value={countPrice || 0} className={`fomat-input border-0 ${choosePrice.name === "" ? "d-none" : "d-block"}`} style={{ outline: "none" }} />
                </div>
            </div>
            <div>

                <h5 className="mt-5">Giá trị ước tính</h5>

                <PageRefresh e={chooseCoinWallet} countPrice={countPrice} choosePrice={choosePrice} />
                <h7>Phí gas: 0.002 POLSCOIN</h7>
                <br></br>
                <h7>Số dư nhận: {countPrice || 0}<span className='mx-2'>{choosePrice.name.toUpperCase()}</span></h7>
                <p>Rate is for only reference only 2 year ago</p>
                <button className="btn btn-primary w-100 mt-3" disabled={countPrice !== undefined && countPrice !== 0 && choosePrice.price !== null ? false : true} onClick={() => handlePriceCoin(choosePrice, countPrice)} >
                    Swap Now
                </button>
                <AlertCoin show={alert} handleShowAlert={handleShowAlert} countPrice={countPrice} choosePrice={choosePrice} chooseCoinWallet={chooseCoinWallet} />

                {/* <Tooltip show={state} setstate={setstate} e={e} /> */}


            </div>
        </div>
    )
}
