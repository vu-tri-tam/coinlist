import React from 'react'
import NotFound404 from '../../asset/images/404_illustration_4x.png'

export default function NotFound() {
    return (
        <div className='not-found'>

            <div className='w-100'>

                <img src={NotFound404} alt="" style={{ width: "100%", height: "100%" }} />

            </div>
            <div className='w-100 not-found-text'>
                <h1>Lỗi không tìm thấy trang yêu cầu </h1>
                <p className='mb-5'>Rất tiếc chúng tôi không tìm thấy trang bạn cần tìm
                    xin lỗi vì sự bất tiện này</p>
                <a className='btn-not-found' href='/home'>Trang chủ</a>
            </div>

        </div>
    )
}
