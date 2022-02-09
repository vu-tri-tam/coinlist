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
import News from './newsComponent/news';
import TradingMarket from './TradingMarket/tradingMarket';
import Populars from './popularCoin/populars';
export default function DetailCoin() {
    let { id } = useParams();

    const [coins, setCoins] = useState([])




    useEffect(() => {
        async function filterCoinsById() {
            await AxiosConfig.getAllCoin100(id)?.then(res => setCoins(res?.data))

        }
        filterCoinsById()
        window.scrollTo({
            top: 300,
            left: 100,
            behavior: 'smooth'
        });
    }, [id])

    return (

        <section className="section-item" >

            <div className="detail-main">
                <div className='d-flex detail-item'>
                    <DetailCoinLeft e={coins[0]} id={coins[0]?.id} />
                    <DetailCoinRight e={coins[0]} />
                </div>

                <News id={id} e={coins[0]} />
                <TradingMarket id={id} />
                <Populars />
            </div>


        </section>

    )
}
