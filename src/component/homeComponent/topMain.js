import React, { useState, useEffect } from 'react'
// import InfiniteCarousel from 'react-leaf-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from './item';
import { AxiosConfig } from '../../Api/configAxios';
export default function TopMain() {
    const [coins, setCoins] = useState([])
    const [lineCoin, setLineCoin] = useState()

    useEffect(() => {
        AxiosConfig.getAllCoinTop()?.then((res) => setCoins(res?.data))
    }, [])

    // const handleLineChart = async (idCoins) => {
    //     const resuftDay = await AxiosConfig.getDetailCoin(idCoins)
    //     // console.log(resuftDay, 'ref');
    //     const resuftWeek = await AxiosConfig.getDetailCoinWeek(idCoins)
    //     const resuftYear = await AxiosConfig.getDetailCoinYear(idCoins)

    //     return {
    //         day: fomatData(resuftDay.data.prices),
    //         week: fomatData(resuftWeek.data.prices),
    //         year: fomatData(resuftYear.data.prices)
    //     }

    // }
    // // console.log(lineCoin, 'line');

    // const fomatData = (data) => {
    //     return data?.map((e, i) => {

    //         return {
    //             t: e[0],
    //             y: e[1].toFixed(2)
    //         }
    //     })
    // }
    // console.log(coins, 'line');
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <section className="section-item">
                <div>
                    <h5 className='p-1'>Top Movers</h5>
                </div>
                <div className="all-item-coin mt-4">
                    <div className="swiper-container">
                        <Slider {...settings}>
                            {
                                coins?.length > 0 ? coins?.map((e, i) => (

                                    <Item key={i} data={e} id={e?.id} />
                                )) : <div>
                                    <p>Chưa có dữ liệu</p>
                                </div>
                            }
                        </Slider>


                    </div>
                </div>

            </section>

        </div>
    )
}
