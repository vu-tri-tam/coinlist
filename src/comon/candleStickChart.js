import React, { useState, useEffect } from 'react'
import ApexCharts from 'react-apexcharts'
import { AxiosConfig } from '../Api/configAxios'
import Loading from './loading'

export default function CandleStickChart({ id, data, valueChart }) {


    const [coins, setCoins] = useState([])
    const [ChangeDataCoins, setData] = useState({
        StockX: []

    })

    // console.log(data, 'cáhnge');


    // const handleNumberToArray = (number, quantity) => {
    //     var results = [];
    //     var start = 0;
    //     for (let i = 0; i < 1; i++) {
    //         results.push(number.splice(0, quantity))
    //         if (results.length >= 6) {
    //             break;
    //         }

    //         start++
    //     }

    //     return results;
    // }

    const aa = {

        series: [{
            name: 'price',
            data: ChangeDataCoins?.StockX
        }],

        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                // zoom: {
                //     type: 'x',
                //     enabled: true,
                //     // autoScaleYaxis: true
                // },
                toolbar: {
                    autoSelected: 'zoom'
                },
                width: '100%'
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: `Biểu đồ thống kê ${data?.name.toUpperCase()}`,
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.3,
                    stops: [100, 100]
                },
                colors: data?.price_change_percentage_24h < 0 ? 'red' : "green"
            },
            yaxis: [{
                y: 30,
                borderColor: 'red',
                label: {
                    show: true,
                    text: 'Support',
                    style: {
                        colors: "red",
                        background: 'red'
                    }
                }
            }],


            colors: data?.price_change_percentage_24h < 0 ? ['red'] : ['green'],
            markers: {
                colors: data?.price_change_percentage_24h < 0 ? 'red' : "green"
            },

            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
                x: {
                    format: 'dd MMM yyyy'
                }
            }, theme: {
                mode: 'light',
                palette: 'palette1',
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            },
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
        }
    }

    // console.log(aa.series[0].data, 'aa');

    // console.log(coins?.day, 888);
    useEffect(() => {
        async function fetchDataDay(id) {
            const resuftDay = await AxiosConfig.getDetailCoin(id)
            const resuftWeek = await AxiosConfig.getDetailCoinWeek(id)
            const resuftYear = await AxiosConfig.getDetailCoinYear(id)

            setCoins({
                day: fomatData(resuftDay?.data?.prices),
                week: fomatData(resuftWeek?.data?.prices),
                year: fomatData(resuftYear?.data?.prices)
            })
        }

        fetchDataDay(id)


    }, [id])
    // console.log(coins?.day, 888);
    let stockChartX = []
    // let stockChartY = []
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

        return data?.map((e, i) => {

            return {
                x: new Date(e[0]).getTime(),
                y: e[1].toFixed(4)
            }
        })
    }
    // console.log(output);
    // let stockChartX = []
    // let stockChartY = []
    // let data = [];


    // useEffect(() => {
    //     let y = [];
    //     let output = [];
    //     const arr = [];
    //     // console.log(typeof (output), '113311');
    //     // console.log('dô trong rồi nè');
    //     const handleChart = (coins) => {
    //         // console.log(coins?.day, 'coins');
    //         coins?.day?.map((el, idx) => {
    //             for (let i = 0; i < el?.length; i++) {
    //                 y.push(el[1])
    //                 for (let j = 0; j < 6; j++) {
    //                     output.push({ x: new Date(el[0]), y });
    //                 }
    //             }
    //             // for (let i = 0; i < el?.length; i++) {

    //             //     y.push(el[1]);
    //             // }

    //             // for (let j = 0; j < el?.length; j++) {

    //             //     output.push({ x: new Date(el[0]), y });
    //             // }
    //         })



    //         // Object.entries(output).forEach((ele) => {
    //         //     ele.forEach((e) => {
    //         //         arr.push(e);
    //         //     })
    //         // })
    //         // let arrayStick = output.map()
    //         console.log(output, '1111');
    //         setData(output)

    //     }
    //     handleChart(coins)
    //     console.log(typeof (output), 'out');
    // }, [coins])


    return (
        <div className="w-100" style={{ position: "relative", height: "500px" }}>
            {
                ChangeDataCoins?.StockX?.length > 0 ?
                    <ApexCharts options={aa.options} series={aa.series} type="area" height={500} />
                    :
                    <Loading type="spinningBubbles" color="blue" width={30} height={30} className="loadingDetail" />

            }

        </div>

    )
}
