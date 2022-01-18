import React, { useState, useEffect } from 'react'
import ChartCrypto from '../../comon/chartCrypto'
// import LineChart from '../../comon/lineChart'
import Tooltip from '../../comon/toolTips'
import { AxiosConfig } from '../../Api/configAxios';
// import Example from '../../comon/toolTips'
import {

    Link, useParams
} from "react-router-dom";
import DetailCoinLeft from './detailCoin-left';
import DetailCoinRight from './detailCoin-right';
import Loading from '../../comon/loading';
export default function DetailCoin() {
    let { id } = useParams();

    const [coins, setCoins] = useState([])




    useEffect(() => {
        async function filterCoinsById() {
            await AxiosConfig.getAllCoin100(id)?.then(res => setCoins(res?.data))

        }
        filterCoinsById()

    }, [id])

    return (

        <section className="section-item" >

            <div className="detail-main">
                <DetailCoinLeft e={coins[0]} id={coins[0]?.id} />
                <DetailCoinRight e={coins[0]} />
            </div>


        </section>

    )
}
