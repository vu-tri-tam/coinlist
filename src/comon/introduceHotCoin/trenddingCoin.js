import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AxiosConfig } from "../../Api/configAxios";
import { AiOutlineFire } from 'react-icons/ai';
export default function TrenddingCoin() {
    const [trendding, setTrendding] = useState([])
    console.log(trendding, 'trend');
    useEffect(() => {
        AxiosConfig.getTrendding()?.then(res => setTrendding(res?.data))
    }, [])

    const settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 500,
        arrows: false,
        adaptiveHeight: true,
        appendDots: dots => <ul>{dots}</ul>,
        customPaging: i => (
            <div className="ft-slick__dots--custom">
                <div className="loading" />
            </div>
        )
    };

    return (
        <div className="App">
            <h5>Top trendding <AiOutlineFire /></h5>

            <Slider {...settings}>
                {
                    trendding?.coins?.map((e, i) => {
                        return <div className='trendding d-flex'>
                            <a className='trendding-img' href={`/detail-coin/${e?.item?.id}`}>
                                <img src={e?.item?.large} alt="" width={30} height={30} />
                            </a>
                            <p className='fw-bold'>{e?.item?.name}({e?.item?.symbol})</p>
                            <a href="">#{e?.item?.market_cap_rank}</a>
                            <div className='d-flex mx-3'>

                                <p className='fw-bold'>{e?.item?.price_btc.toFixed(20)}<span className='mx-2'>BTC</span></p>
                            </div>


                        </div>
                    })
                }
            </Slider>
        </div>
    );
}
