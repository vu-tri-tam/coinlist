import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { BiLike, BiDislike } from 'react-icons/bi';
import AxiosConfigSever from '../../../Api/callAPI/callApiLike';

export default function ShowComment_user({ show, handleClose }) {
    const [comment, setAllComment] = useState([])

    useEffect(() => {
        AxiosConfigSever.getCommentByUserLogin()?.then(res => setAllComment(res?.data))

    }, [comment])

    return (
        <Offcanvas show={show} onHide={handleClose} backdrop={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{comment?.tokenMe?.length} Bình luận</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    comment?.tokenMe?.length > 0 ? comment?.tokenMe?.map((e, idx) => {
                        return <div className='mb-3 showAllComment'>
                            <div className='item-comment-name'>
                                <h5>{e?.userName}</h5>
                                <p>Ngày {e?.date}</p>
                            </div>

                            <div className='item-comment-content'>
                                <b>{e?.content}</b>
                            </div>
                            <div className='item-comment-repply'>
                                <ul>
                                    <li>  <BiLike /></li>
                                    <li>      <BiDislike /></li>
                                    <li> <button className='btn'>Phản hồi</button></li>
                                </ul>


                            </div>

                        </div>
                    }) : "Chưa có nhận xét nào"
                }


            </Offcanvas.Body>
        </Offcanvas>
    )
}
