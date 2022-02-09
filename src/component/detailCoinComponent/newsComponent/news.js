import React, { useEffect, useState } from 'react';
// import pancake from "../../../asset/images/avatarMe.jpg"
import { AxiosConfig } from '../../../Api/configAxios';
import DonutChart from '../../../comon/donutChart/donutChart';
export default function News({ e, id }) {
    console.log(e, 'e');
    const [company, setPublicCompany] = useState()
    console.log(company, 'cf');
    useEffect(() => {
        AxiosConfig.get_public_companies(id)?.then((res) => setPublicCompany(res?.data))
    }, [])
    return <div className="feel-user mt-3">
        <div className="d-flex news" style={{ justifyContent: "space-between" }}>
            <div>
                <h5>Thống kê số lượng nắm giữ trên thị trường:</h5>
                <div className='mt-5'>
                    <div className='d-flex'>
                        <h6 className='text-primary'>Tổng số lượng holding:</h6>
                        <p className='mx-2 text-primary'>{company?.total_holdings || "Đang cập nhật..."}</p>
                    </div>
                    <div className='d-flex'>
                        <h6 className='text-success'>Chỉ số cap dominance:</h6>
                        <p className='mx-2 text-success'>{company?.market_cap_dominance || "Đang cập nhật..."}</p>
                    </div>
                    <div className='d-flex'>
                        <h6 className='text-warning'>Tổng giá trị USDT:</h6>
                        <p className='mx-2 text-warning'>{company !== undefined ? company?.total_value_usd + "$" : 0 + "$"}</p>
                    </div>

                </div>
            </div>
            <div>
                <DonutChart company={company} />
            </div>
            {/* <div className="icon-feel d-flex text-right">
                <img src={e?.image} alt="" width={200} height={200} />
            </div> */}
        </div>

    </div>
}
