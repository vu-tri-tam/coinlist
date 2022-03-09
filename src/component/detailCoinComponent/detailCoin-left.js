import React, { useState, useEffect } from 'react'
import ChartCrypto from '../../comon/chartCrypto'
import { AiOutlineExclamationCircle, AiOutlineSearch, AiOutlineLink } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {

    Link,
    useRouteMatch,

} from "react-router-dom";
// import { Tabs, Tab } from 'react-bootstrap'
import Loading from '../../comon/loading';
// import Tooltip from '../../comon/toolTips'
import CandleStickChart from '../../comon/candleStickChart';
export default function DetailCoinLeft({ e, id }) {

    const [valueChart, setValueChart] = useState(null)
    const [chooseChart, setChooseChart] = useState(true)
    const [dotToolTip, setShowOptionDotToolTip] = useState(false)
    console.log(chooseChart, 777);
    // const handleHoverLineMouse = (e) => {

    //     var x = e.clientX;
    //     var y = e.clientY;
    //     var coor = "Coordinates: (" + x + "," + y + ")";
    //     // console.log(coor, 66665);
    // }
    const handleOnchange = (data) => {
        switch (data) {
            case "Price (USD)":
                setChooseChart(true)
                break;

            case "Price volumn":
                setChooseChart(false)
                break;

            default:
                break;
        }

    }

    return (
        <div className="detail-main-left">
            <div className="link">
                <ul className="p-0">
                    <li><Link to="/">All price</Link><span className="mx-2">&gt;</span></li>
                    <li>{e?.name} Price</li>
                </ul>
            </div>
            <div className="titlbracum w-100 mb-3">
                <div className=" titlbracum-left d-flex">
                    <span style={{ marginRight: "2%" }}><img src={e?.image} width={30} height={30} alt /></span>
                    <h5 className='m-0' style={{ width: "13rem", whiteSpace: "nowrap" }}>{e?.name.toUpperCase()}<span className="mx-2">{e?.symbol.toUpperCase()}</span></h5>
                </div>


                <div className=" titlbracum-right">
                    <BsThreeDotsVertical className='dot-option' onClick={() => setShowOptionDotToolTip(!dotToolTip)} />
                    {
                        dotToolTip ? <div className='tooltip-dot-option'>
                            <Link to="#"><span><i className="fa fa-star-o" aria-hidden="true" /></span>Add to Wacthlist</Link>
                        </div> : null
                    }
                    <Link to="#" className='add-watch-list'><span><i className="fa fa-star-o" aria-hidden="true" /></span>Add to Wacthlist</Link>
                </div>
            </div>
            <div className='social'>
                <ul>
                    <li><a className='bg-price_change bg-light p-1 text-secondary' ><AiOutlineLink />{e?.id}</a></li>
                    <li><a className='bg-price_change bg-light p-1 text-secondary'><AiOutlineSearch />Trình duyệt</a></li>

                    <li className='hover-social bg-price_change bg-light p-1 text-secondary'><FaRegUser />Cộng đồng<RiArrowDropDownLine />
                        <div className='bg-socical'>
                            <ul>
                                <li><a href={`https://twitter.com/${e?.id}`}>https://twitter.com/{e?.id}</a></li>
                                <li><a href={`reddit.com/r/${e?.id}`}>reddit.com/r/{e?.id}/</a></li>
                            </ul>
                        </div>


                    </li>

                </ul>
            </div>
            {/* <p className='cc'>cc
               </p> */}

            <div className="contai-left-all">
                {
                    chooseChart !== false ? <div className="detai-container">
                        <div className="detail-box mb-2">
                            <span className="h3" style={{ marginRight: "1%" }}>
                                ${e?.current_price} USD
                            </span>
                            {
                                e?.price_change_percentage_24h < 0 ? <span className="h4 text-danger">{e?.price_change_percentage_24h.toFixed(2)}%</span> : <span className="h4 color-up">{e?.price_change_percentage_24h.toFixed(2)}%</span>

                            }

                            <span className>(24H)</span>
                        </div>
                        {/* <div className="detail-box-1 mb-2">
                            <span>0.000065 BTC</span>
                            <span className="color-up">+6.61%</span>
                            <span>(24H)</span>
                        </div> */}
                    </div> : null
                }
                <div className="css-block-option w-100 pb-5">
                    <select className='form-select' onChange={(e) => handleOnchange(e?.target?.value)}>
                        <option value="Price (USD)" >Price (USD)</option>
                        <option value="Price volumn" >Price volumn</option>
                    </select>
                    <div className="value-chart" >
                        <ul>
                            <li><Link to="#" onClick={() => setValueChart(1)}>1D</Link></li>
                            <li><Link to="#" onClick={() => setValueChart(2)}>1W</Link></li>
                            <li><Link to="#" onClick={() => setValueChart(3)}>1Y</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="css-ua8w78 d-flex w-100">
                    <div className='d-flex' style={{ width: "25%" }}>

                        <a className="chakra-text css-185ouui " onClick={() => setChooseChart(true)}>Price (USD)
                        </a>
                        <a className='' onClick={() => setChooseChart(false)}>Price volumn</a>
                    </div>
                    {
                        chooseChart !== false ? <div className="chakra-stack text-right" style={{ marginLeft: "auto" }}>
                            <ul>
                                <li><Link to="#" onClick={() => setValueChart(1)}>1D</Link></li>
                                <li><Link to="#" onClick={() => setValueChart(2)}>1W</Link></li>
                                <li><Link to="#" onClick={() => setValueChart(3)}>1Y</Link></li>
                            </ul>
                        </div> : null
                    }

                </div>
                {/* <CandleStickChart id={id} data={e} /> */}
                <div className="w-100 bg-default" >
                    {/* <ChartCrypto id={id} data={e} valueChart={valueChart} /> */}
                    {
                        chooseChart ?
                            <CandleStickChart data={e} id={id} valueChart={valueChart} /> : <div>
                                <ChartCrypto id={id} data={e} valueChart={valueChart} />
                            </div>
                    }

                </div>
                {
                    chooseChart !== false ? <div className="volum-all mt-3 d-flex">
                        <div className="volum-item mx-2">
                            <div className="volum-tittle">
                                <h2>MarketCap</h2>
                                <div>(USD)</div>
                                <AiOutlineExclamationCircle />
                            </div>
                            <p className="price-cap">${e?.market_cap.toLocaleString()}</p>
                        </div>
                        <div className="volum-item mx-2">
                            <div className="volum-tittle">
                                <h2>24H VOLUM</h2>
                                <div>(USD)</div>
                                <AiOutlineExclamationCircle />
                            </div>
                            <p className="price-cap">${e?.total_volume.toLocaleString()}</p>
                        </div>
                        <div className="volum-item mx-2">
                            <div className="volum-tittle">
                                <h2>Circulating Supply</h2>
                                <div>(USD)</div>
                                <AiOutlineExclamationCircle />
                            </div>
                            <p className="price-cap">${e?.circulating_supply.toLocaleString()}</p>
                        </div>
                        <div className="volum-item mx-2">
                            <div className="volum-tittle">
                                <h2>Max Supply</h2>
                                <div>(USD)</div>
                                <AiOutlineExclamationCircle />
                            </div>
                            <p className="price-cap">${e?.max_supply !== null ? e?.max_supply.toLocaleString() : "Đang cập nhật"}</p>
                        </div>
                    </div> : null
                }

            </div>
            <div className="feel-user mt-3">
                <div className="all-question">
                    <h5>Bạn cảm thấy {e?.symbol.toUpperCase()} như thế nào?</h5>
                    <p>Đánh giá cho chúng tôi biết nhé </p>
                </div>
                <div className="icon-feel d-flex text-right">
                    <i className="fa fa-thumbs-o-up mx-2" aria-hidden="true" />
                    <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                </div>
            </div>
            <div className="feel-user mt-3">
                <div className="about-tittle">
                    <h5>About {e?.symbol.toUpperCase()}</h5>
                    <span className=" bg-primary rounded-pill p-1 text-white mx-2">Rank #{e?.market_cap_rank}</span>
                </div>
                <div className="all-description mt-4">
                    <p>Chiliz’s price today is 0,3513 USD, with a 24-hour trading volume of 632,900,408.55 USD.
                        CHZ is up 9.27% in the last 24 hours. It is currently -3.86% below its 7-day all-time
                        high of 0.3654 USD, and 22.90% above its 7-day all-time low of 0.2858 USD. CHZ has a
                        circulating supply of 5,941,076,911.46 CHZ and a max supply of 8,888,888,888.00 CHZ.</p>
                    <p>Chiliz’s price today is 0,3513 USD, with a 24-hour trading volume of 632,900,408.55 USD.
                        CHZ is up 9.27% in the last 24 hours. It is currently -3.86% below its 7-day all-time
                        high of 0.3654 USD, and 22.90% above its 7-day all-time low of 0.2858 USD. CHZ has a
                        circulating supply of 5,941,076,911.46 CHZ and a max supply of 8,888,888,888.00 CHZ.</p>
                </div>
            </div>
        </div>
    )
}
