import React, { useEffect, useState } from 'react';
import pancake from "../../../asset/images/avatarMe.jpg"
import { AxiosConfig } from '../../../Api/configAxios';
import Pagination from '../../../comon/paginate/paginate';




export default function TradingMarket({ id }) {

    const [company, setPublicCompany] = useState()

    //phân trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)
    const usePage = 3;
    const indexOfFirt = indexFirt * usePage;
    const current = company?.companies?.slice(indexOfFirt, indexOfFirt + usePage)

    useEffect(() => {
        AxiosConfig.get_public_companies(id)?.then((res) => setPublicCompany(res?.data))
    }, [])
    return <div className="feel-user mt-5">
        <div className=" d-flex">
            <h5>Danh sách công ty đại chúng nắm giữ</h5>
            {/* <span className=" bg-primary rounded-pill p-1 text-white mx-2">Vĩnh cửu</span> */}
        </div>
        <div className="mt-3">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name/Country</th>
                        <th>Symbol</th>
                        <th>Percentage_of_total_supply</th>
                        <th>Total_current_value_usd</th>
                        <th>Total_entry_value_usd</th>
                        <th>Total_holdings</th>
                        <th>Tin cậy</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        current?.length > 0 ? current?.map((e, i) => {
                            return <tr>
                                {/* <td><AiOutlineStar /></td> */}
                                <td>{i}</td>
                                <td>
                                    <div className="d-flex text-left">
                                        {/* <div className="chart-coin ">

                                            <a>
                                                <img src={pancake} alt />
                                            </a>
                                        </div> */}
                                        <div className="d-flex flex-column name-chart">
                                            <p>{e?.name}</p>
                                            <p className="name-coin">{e?.country}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{e?.symbol}</td>
                                <td>{e?.percentage_of_total_supply}$</td>
                                <td>{e?.total_current_value_usd.toLocaleString()}$</td>
                                <td>{e?.total_entry_value_usd.toLocaleString()}$</td>
                                <td>{e?.total_holdings}</td>


                                <td>
                                    100%
                                </td>
                            </tr>
                        }) : <tr><td colSpan={8}>Chưa có dữ liệu</td></tr>
                    }


                </tbody>
                <tbody>
                </tbody>
            </table>
        </div>
        <div className="text-center mt-3">
            <Pagination usePage={usePage} totalPage={company?.companies?.length} setIndexFirt={setIndexFirt} />

        </div>
    </div>

}
