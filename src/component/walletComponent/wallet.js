import React, { useState, useEffect } from 'react'
import { AiFillEyeInvisible, AiFillEye, AiOutlineDownload } from 'react-icons/ai';
import { BiTransferAlt } from 'react-icons/bi';

import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import AxiosConfigSever from '../../Api/callAPI/calApiCoin';
import AxiosConfigUser from '../../Api/callAPI/callApi';
import { AxiosConfig } from '../../Api/configAxios';
// import { Tabs, Tab } from 'react-bootstrap'
import WalletAccount from './walletAccount';
import WalletAllBTC from './walletAllBTC';
import WalletStaking from './walletStaking';
import { useSelector, useDispatch } from 'react-redux';



export default function Wallet() {
    // Link
    // const matchPath = useRouteMatch()
    const [key, setKey] = useState('save');
    const [state, setstate] = useState(false)
    const [coinMe, setCoinme] = useState([])
    const [coins, setCoins] = useState([])
    const [user, setUser] = useState()
    const [totalSupply, setTotal] = useState([])

    // console.log(user);

    const handleTab = (value) => {
        setKey(value)
    }

    const authUser = useSelector(state => state.auth)

    const total = user && user?.wallet?.reduce((total, item) =>
    (
        total + item.total_swap * item.current_Price
    ), 0)

    console.log(total, 'auth');
    // console.log(total);
    // const getLocalUser = localStorage.getItem('account')
    // const getPriceCoinSupply = 
    // localStorage.setItem('total_coin', coinMe[0]?.total_supply / 2)
    useEffect(() => {
        const handleSupplyCoin = async () => {
            await AxiosConfigSever.getCoin()?.then(res => setCoinme(res?.data?.tokenMe))
            await AxiosConfig.getAllCoinTop()?.then(res => setCoins(res?.data))
            // await AxiosConfigSever.getCoin()?.then(res => setCoinme(res?.data?.tokenMe))
            await AxiosConfigUser.getUserLogin()?.then(res => setUser(res?.data?.users))
            // console.log('ok');

        }
        // console.log('jj');
        handleSupplyCoin()
    }, [])

    // console.log(coinMe[0]?.max_supply - 1800000, 777);
    useEffect(() => {
        const handleChangeDataLogin = async () => {
            try {
                // if(total)

                await AxiosConfigUser.updateUserVerifySuccess(user?._id, {
                    total_assets: total || 0
                })
                if (authUser[0]?.verify === true) {
                    if (user && user !== undefined) {
                        const findIdUserSuccessKYC = coinMe[0]?.user_verify_kyc?.findIndex(elementID => elementID?.id_user === user?._id)
                        if (findIdUserSuccessKYC === -1) {
                            // console.log("ok nè ku");
                            user?.wallet.push(
                                {
                                    total_swap: 100000,
                                    image_token: coinMe[0].image,
                                    name_token: coinMe[0].name,
                                    current_Price: coinMe[0]?.current_price

                                }
                            )

                            coinMe[0].user_verify_kyc.push({
                                id_user: user?._id
                            })

                        } else {

                            return null
                        }
                        await AxiosConfigUser.updateWalletUser(user?._id, { ...user, wallet: user.wallet })
                        await AxiosConfigSever.updateSupplyCoin(coinMe[0]?._id, {
                            ...coinMe[0],
                            user_verify_kyc: coinMe[0].user_verify_kyc,
                            max_supply: (coinMe[0]?.max_supply - 10000)
                        })

                    }


                }
            } catch (error) {
                console.log(error);
            }

        }

        handleChangeDataLogin()
    }, [user?._id])


    return (
        <div className="wallet-container">
            <div className="earn ">
                <div className="earn-box-all d-flex p-3">
                    <div className='earn-box-container'>
                        <div className="earn-left">
                            <h5>Earn money</h5>
                            <div className="hidden-money">
                                {
                                    state === true ? <span ><AiFillEye onClick={() => setstate(false)} />  Ẩn tài sản</span> : <span onClick={() => setstate(true)}><AiFillEyeInvisible />  Hiện tài sản</span>

                                }


                            </div>
                        </div>
                        <div className="earn-middle"></div>
                        <div className="earn-right">
                            <p>Thao tác nhanh</p>
                            <div className="earn-right-active">
                                <Link to="/wallet-page/wallet-account">sản phẩm</Link>
                                <a href="">lịch sử</a>
                                <a href="">Tiền mã hóa</a>
                                <Link to="/wallet-page/wallet-account">Ví tiền</Link>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="earn-box-bottom mt-1">


                    <ul className="p-0 m-0">
                        <li className={`p-3 ${key === "save" ? "border-active" : null}`} onClick={() => handleTab('save')}><a>Tiết kiệm</a></li>
                        <li className={`p-3 ${key === "staking" ? "border-active" : null}`} onClick={() => handleTab('staking')}><a>Staking cố định</a></li>
                        <li className={`p-3 ${key === "swap" ? "border-active" : null}`} onClick={() => handleTab('swap')}><a>Swap</a></li>
                        <li className={`p-3 ${key === "wallet" ? "border-active" : null}`} onClick={() => handleTab('wallet')}><a>Ví tiền</a></li>
                        <li className={`p-3 ${key === "laundpatch" ? "border-active" : null}`} onClick={() => handleTab('laundpatch')}><a>Launchpad </a></li>
                    </ul>
                </div>
            </div>
            {
                key === "save" ? <WalletAllBTC state={state} /> :
                    key === "wallet" ? <WalletAccount state={state} user_And_Wallet={authUser} /> :
                        key === "staking" ? <WalletStaking /> : null
            }

            <div className="table-wallet">
                <div className="table-wallet-container p-3 bg-white">
                    <div className="table-wallet-tittle">
                        {/* <ul className="p-0 m-0">
                            <li className="p-3"><a>Tiết kiệm</a></li>
                            <li className="p-3"><a>Staking cố định</a></li>
                            <li className="p-3"><a>Swap</a></li>
                            <li className="p-3"><a>Tiết kiệm</a></li>
                            <li className="p-3"><a>Tiết kiệm</a></li>
                        </ul> */}
                    </div>
                    <div className="table-wallet-table">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th className="table__heading">Trạng thái</th>
                                    <th className="table__heading">Tổng</th>
                                    <th className="table__heading">Tài khoản khả dụng</th>
                                    <th className="table__heading">Đang đặt lệnh</th>
                                    <th className="table__heading">Tổng giá trị BTC</th>
                                    <th className="table__heading">Hành động</th>
                                </tr>
                                {
                                    authUser[0]?.wallet?.map((e, i) => {

                                        return <tr className="table__row">
                                            <td className="table__content" data-heading="Player"> <div className="d-flex text-left">
                                                <div className="chart-coin ">

                                                    <Link to={`/detail-coin`}>
                                                        <img src={e?.image_token} alt />
                                                    </Link>
                                                </div>
                                                <div className="d-flex flex-column name-chart">
                                                    <p>{e?.name_token}</p>
                                                    {/* <p className="name-coin">{e?.name}</p> */}
                                                </div>
                                            </div></td>
                                            <td className="table__content" data-heading="Seasons">{e?.total_swap}</td>
                                            <td className="table__content" data-heading="Points">36.387</td>
                                            <td className="table__content" data-heading="Jersey Number">00000</td>
                                            <td className="table__content" data-heading="Teams">00000</td>
                                            <td className="table__content" data-heading="Career">
                                                <div className='d-flex'>
                                                    <div className='action_token'>
                                                        <span className='mx-2'> <AiOutlineDownload /></span><Link to="/buy-coin">Mua</Link>
                                                    </div>
                                                    <div className='action_token'>
                                                        <span className='mx-2'> <BiTransferAlt /></span><Link to="/buy-coin">Chuyển</Link>
                                                    </div>

                                                </div>

                                            </td>
                                        </tr>
                                    })
                                }


                            </tbody></table>

                    </div>
                </div>
            </div>

        </div>
    )
}
