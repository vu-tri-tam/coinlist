import React, { useEffect, useState } from 'react'
import { AxiosConfig } from "../../Api/configAxios"
import {

    Link
} from "react-router-dom";
import PolyLineCoin from '../../comon/polyLineCoin';
import { AiOutlineStar } from 'react-icons/ai';
import { CgArrowsExchangeV } from 'react-icons/cg';
// import { AiOutlineStar } from "@react-icons/all-files/ai";
export default function BottomMain() {

    const [state, setstate] = useState([])
    const [totalPages, setTotalPages] = useState(10);
    const [page, setPage] = useState(1)
    useEffect(() => {
        AxiosConfig.getAllCoinTop(totalPages, page)?.then((res) => setstate(res?.data))
    }, [page])

    return (
        <div>
            <section className="section-item">
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>stt</th>

                                <th><CgArrowsExchangeV />Name</th>
                                <th><CgArrowsExchangeV />Price</th>
                                <th><CgArrowsExchangeV />24H change</th>
                                <th><CgArrowsExchangeV />24H volume</th>
                                <th><CgArrowsExchangeV />MarketCap</th>
                                <th><CgArrowsExchangeV />Last 7 day</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state && state.map((e, i) => {

                                    return <tr>
                                        <td><AiOutlineStar /></td>
                                        <td>{i}</td>

                                        <td>
                                            <div className="d-flex text-left">
                                                <div className="chart-coin ">

                                                    <Link to={`/detail-coin/${e?.id}`}>
                                                        <img src={e?.image} alt />
                                                    </Link>
                                                </div>
                                                <div className="d-flex flex-column name-chart">
                                                    <p>{e?.name}</p>
                                                    <p className="name-coin">{e?.symbol}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${e?.current_price.toLocaleString()}</td>
                                        {
                                            e?.price_change_percentage_24h < 0 ? <td className="color-up text-danger">{e?.price_change_percentage_24h ? e?.price_change_percentage_24h.toFixed(2) : "chưa có dữ liệu"}</td> : <td className="color-up text-success">{e?.price_change_percentage_24h ? e?.price_change_percentage_24h.toFixed(2) : "Chưa có dữ liệu"}</td>
                                        }

                                        <td>${e?.high_24h ? e?.high_24h.toLocaleString() : "chưa cso dữ liệu"}</td>
                                        <td>${e?.market_cap ? e?.market_cap.toLocaleString() : "chưa có dữ liệu"}</td>
                                        <td>
                                            <div className="css-11a2non">
                                                <PolyLineCoin e={e} />
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary">Trade</button>
                                        </td>
                                    </tr>
                                })
                            }


                        </tbody>
                        <tbody>
                        </tbody>
                    </table>

                </div>
                <div className="text-center mt-3">
                    {
                        state.length === 100 ? <button className="btn btn-primary" onClick={() => {
                            setTotalPages(totalPages - 10);
                            setPage(page - 1)
                        }
                        }>
                            Thu gọn
                        </button> : <button className="btn btn-primary" onClick={() => {
                            setTotalPages(totalPages + 10);
                            setPage(page + 1)
                        }
                        }>
                            Load More
                        </button>
                    }

                    {/* <button className="btn btn-primary">Xem thêm</button> */}
                </div>
            </section>

        </div>
    )
}
