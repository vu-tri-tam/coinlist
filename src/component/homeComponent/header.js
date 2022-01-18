import React, { useState, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineHistory, AiOutlineClose } from 'react-icons/ai';
import { RiMenuUnfoldFill, RiErrorWarningLine, RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { GiMining, GiConfirmed } from 'react-icons/gi';
import { MdArrowDropDown } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
// import { RiArrowDropDownLine } from 'react-icons/bi';
import { ImProfile, ImFire } from 'react-icons/im';
import { IoWarningOutline, IoClose } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion'
import { AxiosConfig } from '../../Api/configAxios';
import {

    Link,
    useRouteMatch,

} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginOutForm } from '../../feature/Auth';
import { RemoveVerifyKYC } from '../../feature/VerifyKYC';
// import AxiosConfigSever from '../../Api/callAPI/callApi';
import { DropdownButton, Dropdown } from 'react-bootstrap'
// import { from '../../feature/Auth';
export default function Header() {

    const authUser = useSelector(state => state.auth)
    const verify = useSelector(state => state.verify)
    // console.log(authUser, 'user');
    const match = useRouteMatch()
    // console.log(match.path.slice(0, 12));
    const [catelogy, setCatelogy] = useState([])
    const [asset_platforms, setAssetPlatforms] = useState([])
    const [coins, setCoins] = useState([])
    const [cloneCoins, setCloneCoins] = useState([])
    const [focus, setFocus] = useState(false)
    const [catelogies, setCate] = useState(false)
    const [barMenu, setDisplayMenu] = useState(false)
    // const [closeMenu, setCloseMenu] = useState(false)
    // const [verifyCheckWallet, setCheckWallet] = useState(false)
    // console.log(cloneCoins);
    useEffect(() => {
        async function getallCate() {
            AxiosConfig.getCatelogy()?.then(res => setCatelogy(res?.data))
            AxiosConfig.getPlatforms()?.then(res => setAssetPlatforms(res?.data))
        }
        async function getallCoin() {
            const coinAll = await AxiosConfig.getAllCoinTop()
            setCoins(coinAll?.data)
            setCloneCoins(coinAll?.data)
        }
        getallCate()
        getallCoin()
    }, [])

    // useEffect(() => {

    // }, [authUser?.wallet])

    // console.log(asset_platforms, 'asset_platforms');

    const dispatch = useDispatch()
    const handleLogOut = () => {
        // console.log(authUser);
        const action = loginOutForm(authUser)
        const actionKYC = RemoveVerifyKYC(verify)
        localStorage.removeItem('account')
        dispatch(action)
        dispatch(actionKYC)
    }

    const handleSearch = (data) => {
        // setFocus(!foccus)
        // console.log(typeof (data));
        let filterData = cloneCoins.filter((e, i) => {
            if (data !== "") {
                return e.name.toLowerCase().indexOf(data) !== -1;
            } else {
                return e
            }

        })
        setCloneCoins(cloneCoins?.length > 0 ? filterData : coins)

    }
    // console.log(focus);

    // console.log(authUser[0]?.userName.match(/\w+/g).length, "mmm");
    return (
        <header >
            {
                barMenu ? <div className="bar-reponsive ">
                    <div className='option-logo'>
                        <Link to="/" className=" titlbracum-left d-flex ">
                            <span className="mx-2"><img src="./images/pols.png" width={30} height={30} /></span>
                            <h5 className="m-0">Polkastater<span>POLS</span></h5>
                        </Link>
                        <IoClose onClick={() => setDisplayMenu(false)} />
                    </div>

                    <Accordion flush>
                        {/* <Accordion.Item eventKey="0">
                            <Accordion.Header>Catelogies</Accordion.Header>
                            <Accordion.Body>

                                <div className="custom-wallet-menu"><Link><span><RiMenuUnfoldFill className="mx-2" />Tổng quan ví</span></Link></div>
                                <div className="custom-wallet-menu"><Link><span><GiMining className="mx-2" />Đào coin</span></Link></div>
                                <div className="custom-wallet-menu"><Link><span><AiOutlineHistory className="mx-2" />Lịch sử </span></Link></div>


                            </Accordion.Body>
                        </Accordion.Item> */}
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Wallet</Accordion.Header>
                            <Accordion.Body>
                                <div className="custom-wallet-menu"><Link to="/wallet-page"><span><RiMenuUnfoldFill className="mx-2" />Tổng quan ví</span></Link></div>
                                <div className="custom-wallet-menu"><Link><span><GiMining className="mx-2" />Đào coin</span></Link></div>
                                <div className="custom-wallet-menu"><Link><span><AiOutlineHistory className="mx-2" />Lịch sử </span></Link></div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>English</Accordion.Header>
                            <Accordion.Body>
                                <Link className="dropdown-item" to="#">Vietnam</Link>
                                <Link className="dropdown-item" to="#">China</Link>
                                <Link className="dropdown-item" to="#">English</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        {

                            match.path.slice(1, 12) === '' ? null :
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Platforms</Accordion.Header>
                                    <Accordion.Body>
                                        <ul style={{ maxHeight: "400px", overflowY: "scroll" }}>
                                            {

                                                asset_platforms?.map((e, i) => {
                                                    return <li className="w-100"><Link className="dropdown-item" to={e?.id}>{e?.name}</Link></li>
                                                })
                                            }

                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                        }

                        {
                            authUser?.length > 0 ? <Accordion.Item eventKey="3">

                                <Accordion.Header>{authUser[0]?.userName}</Accordion.Header>
                                <Accordion.Body>
                                    <Link className="dropdown-item" to="#" onClick={() => handleLogOut()}><BiLogOut className='mx-2' />Logout</Link>
                                    <Link className="dropdown-item" to="/profile-page" ><ImProfile className='mx-2' />Profile</Link>
                                    <Link className="dropdown-item" to="/verify-page"><GiConfirmed className='mx-2' />verify</Link>
                                </Accordion.Body>
                            </Accordion.Item> :
                                <div className='option-auth'>
                                    <Link to="/login-page" className="btn rounded-pill p-0 ">Login</Link>
                                    <button className="btn btn-primary rounded-pill ml-3"><Link to="/sign-up" className="text-white">Sign up</Link></button>

                                </div>





                        }

                        {/* <div className={`dropdown ml-3 ${match.path.slice(1, 12) === '' ? "d-none" : "d-block"}`}>
                            <a className="dropdown-toggle text-dark" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                Platforms
                            </a>
                            <ul className="dropdown-menu dropdown_menu-9" aria-labelledby="dropdownMenuLink" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                                {

                                    asset_platforms?.map((e, i) => {
                                        return <li className="w-100"><Link className="dropdown-item" to={e?.id}>{e?.name}</Link></li>
                                    })
                                }

                            </ul>
                        </div> */}

                    </Accordion>


                </div> : null
            }

            <div className="top-header">
                <div className=" titlbracum-left d-flex">
                    <Link to="/" className=" titlbracum-left d-flex">
                        <span className="mx-2"><img src="./images/pols.png" width={30} height={30} /></span>
                        <h5 className="m-0">Polkastater<span>POLS</span></h5>
                    </Link>
                    {/* <a href="https://lottiefiles.com/76649-checked">success</a> */}
                    <div className={`dropdown ml-3 ${match.path.slice(1, 12) === '' ? "d-none" : "d-block"}`}>
                        <a className="dropdown-toggle text-dark" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Platforms
                        </a>
                        <ul className="dropdown-menu dropdown_menu-9" aria-labelledby="dropdownMenuLink" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                            {

                                asset_platforms?.map((e, i) => {
                                    return <li className="w-100"><Link className="dropdown-item" to={e?.id}>{e?.name}</Link></li>
                                })
                            }

                        </ul>
                    </div>
                    <div className="wallet ml-3">
                        <Link to="/wallet-page" className={`active-wallet dropdown-toggle text-dark ${match.path.slice(1, 12) !== 'login-page' && match.path.slice(1, 12) !== 'sign-up' ? "d-block" : "d-none"} `}>Wallet</Link>

                        <div className="hover-wallet">
                            <div className="custom-wallet-menu"><Link to="/wallet-page"><span><RiMenuUnfoldFill className="mx-2" />Tổng quan ví</span></Link></div>
                            <div className="custom-wallet-menu"><Link to="/mining"><span><GiMining className="mx-2" />Đào coin</span></Link></div>
                            <div className="custom-wallet-menu"><Link to="/history"><span><AiOutlineHistory className="mx-2" />Lịch sử </span></Link></div>

                        </div>
                    </div>


                </div>

                <div className="nav-right">


                    <div className="right">
                        <nav>
                            <ul>
                                <li >
                                    <div className={`d-flex ${match.path.slice(1, 12) !== 'login-page' && match.path.slice(1, 12) !== 'sign-up' ? "d-block" : "d-none"} `}>
                                        <div className="btn css-search">
                                            <AiOutlineSearch />
                                        </div>
                                        <input type="text" className="form-control" placeholder="Tìm kiếm coin tại đây.." onFocus={() => setFocus(true)} />
                                        {/* <input type="text" className="form-control" placeholder="Tìm kiếm coin tại đây.." onChange={(e) => handleSearch(e.target.value)} /> */}
                                    </div>
                                    <div className={`${focus ? "divSearch" : "d-none"} `}>

                                        <div className='search-container p-1'>
                                            <div className="btn search-item">
                                                <AiOutlineSearch />
                                            </div>

                                            <input type="text" style={{ width: "67%" }} placeholder="Tìm kiếm coin tại đây.." onChange={(e) => handleSearch(e.target.value)} />
                                            <div className="btn search-item">
                                                <AiOutlineClose onClick={() => setFocus(false)} />
                                            </div>
                                        </div>
                                        <div className='trending-search'>
                                            <p>Trending</p>
                                            <RiErrorWarningLine className='mx-2' />
                                            <ImFire />
                                        </div>

                                        <ul className='divUlsearch'>
                                            {
                                                cloneCoins && cloneCoins.length > 0 ? cloneCoins?.map((e, i) => {
                                                    return <li key={i}>
                                                        <a className="d-flex" href={`/detail-coin/${e?.id}`}>
                                                            <img src={e?.image} width={30} className="mx-2" height={30} alt="" />
                                                            <span>{e?.name}</span>
                                                            <span style={{ marginLeft: "auto" }}>{e?.price_change_percentage_24h < 0 ? <p className="text-right text-danger">{e?.price_change_percentage_24h.toFixed(2)}%</p> : <p className="text-right text-success">{e?.price_change_percentage_24h.toFixed(2)}%</p>}</span>
                                                        </a>

                                                    </li>
                                                }) : <li><IoWarningOutline />Không tìm thấy dữ liệu bạn cần </li>
                                            }
                                            {/* <li><img src={}/></li> */}
                                        </ul>
                                    </div>
                                </li>
                                {
                                    authUser?.length > 0 ? <li> <div className={`dropdown  `}>
                                        <a className="dropdown-toggle text-dark" type="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            {authUser[0]?.userName}
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ maxHeight: "300px", overflowY: "scroll", textAlign: "left" }}>
                                            <li><Link className="dropdown-item" to="#" onClick={() => handleLogOut()}><BiLogOut />Logout</Link></li>
                                            <li><Link className="dropdown-item" to="/profile-page" ><ImProfile />Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/verify-page"><GiConfirmed />verify</Link></li>
                                        </ul>
                                    </div></li> :
                                        <li>
                                            <div className='handle-auth'>
                                                <Link to="/login-page" className="btn rounded-pill">Login</Link>
                                                <button className="btn btn-primary rounded-pill"><Link to="/sign-up" className="text-white">Sign up</Link></button>
                                            </div>
                                        </li>


                                }

                                <li>
                                    <div className={`dropdown ${match.path.slice(1, 12) !== 'login-page' && match.path.slice(1, 12) !== 'sign-up' ? "d-block" : "d-none"} `}>
                                        <DropdownButton id="" title="  English">
                                            {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                                            <Dropdown.Item ><Link className="dropdown-item" to="#">Vietnam</Link></Dropdown.Item>
                                            <Dropdown.Item ><Link className="dropdown-item" to="#">China</Link></Dropdown.Item>
                                            <Dropdown.Item ><Link className="dropdown-item" to="#">English</Link></Dropdown.Item>
                                        </DropdownButton>
                                        {/* <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            English
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ maxHeight: "300px", overflowY: "scroll", textAlign: "left" }}>
                                            <li><Link className="dropdown-item" to="#">Vietnam</Link></li>

                                        </ul> */}
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <FaBars className='bar-menu ml-3' onClick={() => setDisplayMenu(true)} />
                    </div>

                </div>
            </div>
            <hr />
            <div className={`bottom-header ${match.path.slice(1, 12) !== 'login-page' && match.path.slice(1, 12) !== 'sign-up' ? "d-block" : "d-none"} `}>
                <div className="center-list">
                    <ul>
                        <li><a >All Coins</a>

                        </li>
                        <li><span>|</span></li>
                        <li><span>Catelogies{catelogies ? <RiArrowDropUpLine onClick={() => setCate(!catelogies)} /> : <RiArrowDropDownLine onClick={() => setCate(!catelogies)} />}</span></li>


                        <div className={`catelogies ${catelogies ? "presently" : "d-none"}`}>
                            <ul>
                                {
                                    catelogy?.map((e, idx) => {
                                        return <li><a className="border-radius" href={e?.category_id}>{e?.name}</a></li>
                                    })
                                }
                            </ul>

                        </div>



                    </ul>
                </div>
            </div>

        </header>

    )
}
