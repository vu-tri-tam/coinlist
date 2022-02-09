import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
export default function DonutChart({ company }) {

    // useEffect(() => {

    // }, [])

    const aa = {
        options: {
            labels: ['Holding', 'Dominance'],
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

        series: company !== undefined ? [

            company?.total_holdings / (company?.total_holdings + company?.market_cap_dominance) * 100,
            company?.market_cap_dominance / (company?.market_cap_dominance + company?.total_holdings) * 100



        ] : [100]

        // series: [company?.market_cap_dominance / (company?.market_cap_dominance + company?.total_holdings) * 100, company?.total_holdings / (company?.total_holdings + company?.market_cap_dominance) * 100],

    }
    return (
        <div className="donut">
            <Chart options={aa.options} series={aa.series} type="donut" width="380" />
        </div>
    );
}
