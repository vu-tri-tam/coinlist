import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AxiosConfig } from '../../../Api/configAxios';
import Item from '../../homeComponent/item';
export default function Populars() {
    const [coins, setCoins] = useState([])
    const [lineCoin, setLineCoin] = useState()

    useEffect(() => {
        AxiosConfig.getAllCoinTop()?.then((res) => setCoins(res?.data))
    }, [])
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
    return <section className="section-item mt-5">
        <div>
            <h5 className='p-1'>Mọi người cũng xem</h5>
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

}
