import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import 'react-popper-tooltip/dist/styles.css';
import { IoIosClose } from 'react-icons/io';
import AxiosConfigUser from '../Api/callAPI/callApi';
import Swal from 'sweetalert2'
function Tooltip({ show, setstate, e, coins }) {

    const [state, setStatus] = useState(true)
    const [price, setPrice] = useState()
    // const [loginUser[0], setAssets] = useState()

    const loginUser = useSelector(state => state.auth);
    // console.log(loginUser?.wallet, '6');
    const [choosePrice, setChoose] = useState({
        id: null,
        name: "",
        img: ""
    })
    const getUserIdChange = localStorage.getItem('account')
    // useEffect(() => {
    const total = loginUser[0] && loginUser[0]?.wallet?.reduce((total, item) =>
    (
        // console.log(item.total_swap * item.current_Price, 8787)
        total + item.total_swap * item.current_Price
    ), 0)
    // const getDateFromUser = async () => {
    //     try {
    //         if (loginUser.length > 0) {
    //             await AxiosConfigUser.getUserLogin()?.then(res => setAssets(res?.data?.users))
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }


    // }
    // getDateFromUser()
    console.log('ass');
    // }, [])

    console.log(total, 'toatal');

    const handleChoosePrice = async (id) => {
        // console.log(id, 887);
        const filterName = await coins?.filter((el, idx) => el?.id === id)
        // console.log(filterName[0].id, 999);
        setChoose({
            id: filterName[0]?.id,
            name: filterName[0]?.name,
            img: filterName[0]?.image
        })
    }

    const handlePriceCoin = () => {
        Swal.fire({
            title: 'Xác nhận giao dịch?',
            text: 'Bạn sẽ không thể thay đổi hãy cân nhắc trước khi quyết định!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Hủy bỏ'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Giao dịch thành công!',
                    'Your imaginary file has been deleted.',
                    'success'
                )
                const findIndexCoin = loginUser[0]?.wallet?.findIndex(ele => ele?.name_token === e?.name)
                if (findIndexCoin !== -1) {
                    loginUser[0].wallet[findIndexCoin].total_swap += price / e?.current_price
                } else {
                    loginUser[0]?.wallet.push({
                        total_swap: price / e?.current_price,
                        image_token: e?.image,
                        name_token: e?.name,
                        current_Price: e?.current_price
                    })
                }
                await AxiosConfigUser.updateWalletUser(loginUser[0]?._id, { ...loginUser[0], wallet: loginUser[0]?.wallet })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Đã hủy bỏ',
                    'Your imaginary file is safe :)',
                    'error'
                )

            }
        })
    }
    // console.log(price * e?.current_price);
    return (
        <>
            <div className={`tooltip-container ${show === true ? 'd-block' : "d-none"}`}>
                <div style={{ textAlign: "right" }} className="mb-3 mt-3">

                    <IoIosClose className="text-right" onClick={() => setstate(false)}></IoIosClose>
                </div>
                <div className="tooltip-box">
                    <div className="spot">
                        <ul className="d-flex m-0 p-0">
                            <li className={`w-50 mx-2 ${state === true ? "arrow-Border text-white" : ""}`}>
                                <button className={`btn w-100 `} onClick={() => setStatus(true)}>Mua</button>
                            </li>
                            <li className={`w-50 mx-2 ${state !== true ? "arrow-Border-right  text-white" : ""}`}>
                                <button className={`btn w-100 `} onClick={() => setStatus(false)}>Bán</button>
                            </li>
                        </ul>
                        <div className={`${state === true ? "d-block" : "d-none"}`}>
                            <ul className={`nav nav-pills mb-3 mt-4`} id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Giới hạn</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Thị trường</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    {/* <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"> */}
                                    <div class="dropdown">
                                        <span class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Stop limit
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                    {/* </button> */}
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div className="d-flex" style={{ alignItems: "center" }}>
                                        <p>Khả dụng: {e?.name}</p>

                                    </div>
                                    <div>
                                        <p>Sẵn usdt: {loginUser.length > 0 ? total : 0}$</p>
                                    </div>

                                    <div className="d-flex flex-column mt-4">
                                        <div className="detail-right-coin d-flex ">
                                            <div className="d-flex text-left p-2" style={{ flexGrow: 2 }}>
                                                <div className="d-flex flex-column name-chart">
                                                    <p className="name-coin">Giá</p>
                                                </div>
                                            </div>
                                            <div className="detail-right-form p-2">
                                                <input type="text" value={e?.current_price.toFixed(3)} className="fomat-input" style={{ outline: "none" }} />
                                            </div>
                                        </div>
                                        <div className={`detail-right-coin d-flex mt-3 ${price > total ? "border-danger" : null} `}>
                                            <div className="d-flex text-left p-2" style={{ flexGrow: 2 }}>
                                                <div className="d-flex flex-column name-chart">
                                                    <p className="name-coin">Số tiền</p>
                                                </div>
                                            </div>
                                            <div className="detail-right-form p-2">
                                                <input type="text" defaultValue={1} disabled={loginUser.length > 0 ? false : true} className="fomat-input" onChange={(el) => setPrice(el.target.value)} style={{ outline: "none" }} />
                                            </div>
                                        </div>
                                        <div className={`detail-right-coin d-flex mt-3 ${price > total ? "border-danger" : null}`}>
                                            <div className="d-flex text-left p-2" style={{ flexGrow: 2 }}>
                                                <div className="d-flex flex-column name-chart">
                                                    <p className="name-coin">Tổng coin nhận được:</p>
                                                </div>
                                            </div>
                                            <div className="detail-right-form p-2">
                                                <input type="text" value={loginUser.length > 0 ? price / e?.current_price : 0} className="fomat-input" style={{ outline: "none" }} />
                                            </div>

                                        </div>
                                        <div className="detail-right-form p-2" style={{ textAlign: "right" }}>
                                            <p className='text-danger w-100'>{price > total ? `Vượt quá số dư khả dụng ${total} $` : null}</p>
                                        </div>
                                        <div className="d-flex mt-3 " style={{ justifyContent: "center" }}>
                                            {
                                                loginUser.length <= 0 ? <div className="text-center">
                                                    <button className="btn btn-primary"><a href="/login-page" className="text-white">Đăng nhập</a></button>
                                                    <button className="btn btn-primary m-2"><a href="/sign-up" className="text-white">Đăng ký</a></button>
                                                </div> : <button className="btn btn-primary w-100" onClick={() => handlePriceCoin()} disabled={!price || price >= total || !total || isNaN(price) ? true : false}>Xác nhận mua</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <p>Khả dụng: {e?.name}</p>
                                    <div className="d-flex flex-column mt-4">
                                        <div className="detail-right-coin d-flex ">
                                            <div className="d-flex text-left p-2" style={{ flexGrow: 2 }}>
                                                <div className="d-flex flex-column name-chart">
                                                    <p className="name-coin">Giá</p>
                                                </div>
                                            </div>
                                            <div className="detail-right-form p-2 d-flex">
                                                <p >Thị trường</p>
                                                <span>BNB</span>
                                            </div>
                                        </div>
                                        <div className="detail-right-coin d-flex mt-3">
                                            <div className="d-flex text-left p-2" style={{ flexGrow: 2 }}>
                                                <div className="d-flex flex-column name-chart">
                                                    <p className="name-coin">Số lượng</p>
                                                </div>
                                            </div>
                                            <div className="detail-right-form p-2">
                                                <input type="text" defaultValue={1.00} className="fomat-input" style={{ outline: "none" }} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="arrow" />
            </div>



        </>
    );
}

export default Tooltip;