import React, { useState, useEffect } from 'react'
import ApexCharts from 'react-apexcharts'
import { AxiosConfig } from '../Api/configAxios'

export default function CandleStickChart({ id, data, valueChart }) {


    const [coins, setCoins] = useState([])
    const [ChangeDataCoins, setData] = useState({
        StockX: []

    })
    // const [state, setstate] = useState(
    //     {
    //         series: [{
    //             name: "Volumn Binance",
    //             data: [45, 52, 38, 24, 33, 246, 21, 20, 64, 8, 15, 150]
    //         },
    //         {
    //             name: "Volumn Huobi",
    //             data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    //         },
    //         {
    //             name: 'Volumn MXC',
    //             data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    //         }
    //         ],
    //         options: {
    //             chart: {
    //                 height: 350,
    //                 type: 'line',
    //                 zoom: {
    //                     enabled: true
    //                 },
    //             },
    //             dataLabels: {
    //                 enabled: false
    //             },
    //             stroke: {
    //                 // width: [5, 7, 5],
    //                 curve: 'straight',
    //                 // dashArray: [0, 8, 5]
    //             },
    //             title: {
    //                 text: 'Tổng volumn giao dịch trong 30 ngày',
    //                 align: 'left'
    //             },
    //             legend: {
    //                 // tooltipHoverFormatter: function (val, opts) {

    //                 //     return val
    //                 // }
    //             },
    //             markers: {
    //                 size: 0,
    //                 // hover: {
    //                 //     sizeOffset: 6
    //                 // }
    //             },
    //             // xaxis: {
    //             //     categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
    //             //         '10 Jan', '11 Jan', '12 Jan'
    //             //     ],
    //             // },
    //             tooltip: {
    //                 y: [
    //                     // {
    //                     //     title: {
    //                     //         formatter: function (val) {
    //                     //             return val + " (mins)"
    //                     //         }
    //                     //     }
    //                     // },
    //                     // {
    //                     //     title: {
    //                     //         formatter: function (val) {
    //                     //             console.log(val, 'val');
    //                     //             return val + " per session"
    //                     //         }
    //                     //     }
    //                     // },
    //                     // {
    //                     //     title: {
    //                     //         formatter: function (val) {
    //                     //             return val;
    //                     //         }
    //                     //     }
    //                     // }
    //                 ]
    //             },
    //             grid: {
    //                 borderColor: '#f1f1f1',
    //             }
    //         },
    //     }
    // )



    const aa = {

        series: [{
            name: "Volumn Binance",
            data: coins?.binance
        },
        {
            name: "Volumn Huobi",
            data: coins?.huobi
        },
        {
            name: 'Volumn MXC',
            data: coins?.mxc
        }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                width: "100%"
            },
            dataLabels: {
                enabled: false
            },
            // stroke: {
            //     width: [5, 7, 5],
            //     curve: 'straight',
            //     dashArray: [0, 8, 5]
            // },
            title: {
                text: 'Tổng volumn giao dịch trong 30 ngày',
                align: 'left'
            },
            legend: {
                tooltipHoverFormatter: function (val, opts) {

                    return val
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            // xaxis: {
            //     categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
            //         '10 Jan', '11 Jan', '12 Jan'
            //     ],
            // },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                console.log(val, 'val');
                                return val
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#f1f1f1',
            }
            ,
            responsive: [
                {
                    breakpoint: 1000,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: false
                            }
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        },

    }








    useEffect(() => {

        async function fetchDataDay() {
            const resuftBinance = await AxiosConfig.getDetailVolumnCoinMonth("binance")
            const resuftHuobi = await AxiosConfig.getDetailVolumnCoinMonth("huobi")
            const resuftMxc = await AxiosConfig.getDetailVolumnCoinMonth("mxc")
            // console.log(resuftMxc, 7676);
            setCoins({
                binance: fomatData(resuftBinance.data),
                huobi: fomatData(resuftHuobi.data),
                mxc: fomatData(resuftMxc.data)
            })
        }

        fetchDataDay()


    }, [])

    let stockChartX = []

    useEffect(() => {
        const handleChart = (coins, valueChart) => {
            // console.log('cc');
            switch (valueChart) {
                case 1:
                    coins?.day?.filter(el => {
                        stockChartX.push(
                            {
                                x: el?.x,
                                y: el?.y
                            }
                        )
                        // stockChartY.push(el?.y)
                    })
                    setData({
                        StockX: stockChartX

                    })
                    // console.log("ok");
                    break;
                case 2:
                    coins?.week?.filter(el => {
                        stockChartX.push(
                            {
                                x: el?.x,
                                y: el?.y
                            }
                        )
                    })
                    setData({
                        StockX: stockChartX,

                    })
                    break;
                case 3:
                    coins?.year?.filter(el => {
                        stockChartX.push(
                            {
                                x: el?.x,
                                y: el?.y
                            }
                        )
                    })
                    setData({
                        StockX: stockChartX,

                    })
                    break;
                default:
                    coins?.day?.filter(el => {
                        stockChartX.push(
                            {
                                x: el?.x,
                                y: el?.y
                            }
                        )
                    })
                    setData({
                        StockX: stockChartX

                    })
                    break;
            }
        }
        handleChart(coins, valueChart)
    }, [coins, valueChart])


    const fomatData = (data) => {

        let x = []// khai báo x bên trong thì khi tái sử dụng nó sẽ add ta mới còn khai báo bên ngoài thì không thay đổi
        data?.map((e, i) => {
            // console.log(e[1];
            if (e[1] !== undefined) {
                x.push(e[1])
            }

        })
        return x
    }



    return (
        <div className='mt-3'>
            {/* <select name="" id="" onClick={(e) => fetchDataDay(e?.target.value)}>
                <option value="binance">Binance</option>
                <option value="mxc">Mxc</option>
                <option value="huobi">Huobi</option>
            </select> */}
            <ApexCharts options={aa.options} series={aa.series} type="line" height={400} />
        </div>

    )
}
