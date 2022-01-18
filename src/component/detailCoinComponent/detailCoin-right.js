import React, { useState, useEffect } from 'react'
// import Tooltip from '../../comon/toolTips'
import { BsArrowDownUp } from 'react-icons/bs';
import Nav from 'react-bootstrap/Nav'
import SwapCoin from './swapCoin/swapCoin';
import ActiveCoin from './activeCoin/activeCoin';
import { AxiosConfig } from '../../Api/configAxios';
export default function DetailCoinRight({ e }) {
    const [state, setstate] = useState(false)
    const [coins, setCoins] = useState([])
    const [openActiveSwap, setOpen] = useState(false)
    const [countPrice, setCountPrice] = useState()
    const [choosePrice, setChoose] = useState({
        id: null,
        name: "",
        img: "",
        price: null
    })
    // const data = [
    //     {
    //         id: 1,
    //         img: 'ok',
    //         name: "usd"
    //     },
    //     {
    //         id: 2,
    //         img: 'okcc',
    //         name: "busd"
    //     },
    //     {
    //         id: 3,
    //         img: 'okfff',
    //         name: "usdc"
    //     },
    // ]

    useEffect(() => {
        const getStableCoin = async () => {
            await AxiosConfig.getAllCoinTop()?.then((res) => setCoins(res?.data))

        }
        getStableCoin()
    }, [])

    const handlePrice = (data) => {

        setCountPrice(
            data * e?.current_price
        )
    }

    const handleChoosePrice = async (id) => {
        // console.log(id, 887);
        const filterName = await coins?.filter((el, idx) => el?.id === id)
        // console.log(filterName[0].id, 999);
        setChoose({
            id: filterName[0]?.id,
            name: filterName[0]?.symbol,
            img: filterName[0]?.image,
            price: filterName[0]?.current_price
        })
    }



    // console.log(choosePrice, 'count');
    return (
        <div className="detail-main-right">
            <div className=" detail-right-container">
                <h5>Current Converter</h5>
                <Nav variant="pills" defaultActiveKey="#" className='mb-3'>
                    <Nav.Item>
                        <Nav.Link href="#" onClick={() => setOpen(!openActiveSwap)}>Active</Nav.Link>

                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => setOpen(!openActiveSwap)}>Swap coin</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item> */}
                </Nav>
                <p>Amount</p>
                {
                    openActiveSwap ? <SwapCoin e={e} coins={coins} setChoose={setChoose} countPrice={countPrice} handlePrice={handlePrice} /> :
                        <ActiveCoin e={e} choosePrice={choosePrice} handleChoosePrice={handleChoosePrice} coins={coins} setState={setstate} state={state} countPrice={countPrice} handlePrice={handlePrice} />
                }
                {/* <Tooltip show={state} setstate={setstate} e={e} /> */}

            </div>
            <div className=" detail-right-container mt-3">
                <h5>{e?.symbol.toUpperCase()} price Statistics</h5>
                <div>
                    <div className="price-volum-box mb-3 mt-5">
                        <p>{e?.name} price</p>
                        <p className="flex-end">${e?.current_price.toLocaleString()}</p>
                    </div>
                    <div className="price-volum-box mb-3">
                        <p>24h high / 24h low</p>
                        <p className="flex-end">${e?.high_24h.toLocaleString()}/${e?.low_24h.toLocaleString()}</p>
                    </div>
                    <div className="price-volum-box mb-3">
                        <p>7d high / 7d low</p>
                        <p className="flex-end">$0.003</p>
                    </div>
                    <div className="price-volum-box mb-3">
                        <p>30d high / 30d low</p>
                        <p className="flex-end">$0.003</p>
                    </div>
                    <div className="price-volum-box mb-3">
                        <p>90d high / 90d low</p>
                        <p className="flex-end">$0.003</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
