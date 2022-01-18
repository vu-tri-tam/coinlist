import React, { useState, useEffect } from 'react'
import {

    Link, useParams
} from "react-router-dom";
import { AxiosConfig } from '../../Api/configAxios';
import ChartCrypto from '../../comon/chartCrypto';
import PolyLineCoin from '../../comon/polyLineCoin';
export default function Item({ ...data }) {
    const [coins, setCoins] = useState()
    // console.log(data?.data, 777);
    // const [lineCoin, setLineCoin] = useState()
    // console.log(lineCoin, 56565);

    // async function fetchDataDay(id) {

    //     const resuftDay = await AxiosConfig.getDetailCoin(id)
    //     // console.log(resuftDay, 'ref');
    //     const resuftWeek = await AxiosConfig.getDetailCoinWeek(id)
    //     const resuftYear = await AxiosConfig.getDetailCoinYear(id)

    //     setLineCoin({
    //         day: fomatData(resuftDay?.data?.prices),
    //         week: fomatData(resuftWeek?.data?.prices),
    //         year: fomatData(resuftYear?.data?.prices)
    //     })
    // }

    // fetchDataDay(data?.id)




    // const fomatData = (data) => {
    //     return data?.map((e, i) => {

    //         return {
    //             t: e[0],
    //             y: e[1].toFixed(2)
    //         }
    //     })
    // }
    // useEffect(() => {
    //     async function fetchDataDay(id) {
    //         const resuftDay = await AxiosConfig.getDetailCoin(id)
    //         // console.log(resuftDay, 'ref');
    //         const resuftWeek = await AxiosConfig.getDetailCoinWeek(id)
    //         const resuftYear = await AxiosConfig.getDetailCoinYear(id)

    //         setCoins({
    //             day: fomatData(resuftDay.data.prices),
    //             week: fomatData(resuftWeek.data.prices),
    //             year: fomatData(resuftYear.data.prices)
    //         })
    //     }

    //     fetchDataDay(data?.data?.id)


    // }, [])
    // // console.log(data, "234");
    // const fomatData = (data) => {
    //     return data?.map((e, i) => {

    //         return {
    //             t: e[0],
    //             y: e[1].toFixed(2)
    //         }
    //     })
    // }
    // console.log(id, 'coins');
    return (

        <div className="item-coin">
            <div className="info-coin">
                <div className="action-coin mb-2">
                    <Link to={`/detail-coin/${data?.data?.id}`}>
                        <img src={data?.data?.image} width={40} />
                    </Link>

                </div>
                {/* <ChartCrypto id={data?.data?.id} /> */}
                {/* <ChartCrypto id={data?.data?.id} data={data?.data}  /> */}
                <PolyLineCoin e={data?.data} />
                <div className="detail d-flex">
                    <p>{data?.data?.name}</p>
                    <p className="name-coin">{data?.data?.symbol}</p>
                </div>
                <div className="detail-coin d-flex">
                    <p>${data?.data?.current_price.toLocaleString()}</p>
                    {
                        data?.data?.price_change_percentage_24h < 0 ? <p className="text-right text-danger">{data?.data?.price_change_percentage_24h.toFixed(2)}%</p> : <p className="text-right text-success">{data?.data?.price_change_percentage_24h.toFixed(2)}%</p>
                    }

                </div>
            </div>
        </div>

    )
}
