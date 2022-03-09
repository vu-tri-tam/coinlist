import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Ckedittor from './ckeditor/ckedittor';
import AxiosConfigSever from '../../../Api/callAPI/callApiLike'
import { useSelector, useDispatch } from 'react-redux';
import notification from "../../../comon/notification/notification"
import { Prompt } from "react-router-dom"
import Swal from 'sweetalert2'


export default function Comment_user({ show, handleClose }) {
    // console.log(show);
    const [comment_user, setComment] = useState()
    const [showAllAlert, setShow] = useState(false)
    const authUser = useSelector(state => state.auth)
    const handleSubmit = async (data) => {
        try {
            await AxiosConfigSever.postCommentByUserLogin({ content: data, user: authUser[0]?.id, userName: authUser[0]?.userName })
                .then(res =>
                    res?.data?.success ? notification.success('Nhận xét đã được ghi lại') : notification.error('Lỗi không thể gửi nhận xét, vui lòng thử lại !'))
            handleClose(false)

        } catch (error) {
            console.log(error);
        }
        // console.log({ content: data, user: authUser[0]?.id }, 878);

    }

    const handleAlert = () => {

        Swal.fire({
            title: "Dữ liệu chưa được lưu bạn có muốn hủy ?",
            text: 'Bạn sẽ không thể thay đổi hãy cân nhắc trước khi quyết định!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Hủy thành công!',
                    'Your imaginary file has been deleted.',
                    'success'
                )
                handleClose(false)

            }
        })
    }

    return <>
        {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
        {/* {
            showAllAlert ? <SwalAlert tittle="Bạn có muốn rời khỏi đây không ?" /> : null
        } */}

        <Modal
            show={show}
            onHide={() => handleClose(false)}
            backdrop="static"
            keyboard={false}
        >

            <Modal.Body>
                <Form>


                    <Form.Group className="mb-3" controlId="formBasicPassword">

                        <Ckedittor setComment={setComment} />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleAlert}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" onClick={() => handleSubmit(comment_user)} disabled={!comment_user}>Nhận xét</Button>
            </Modal.Footer>
        </Modal>;
    </>
}
