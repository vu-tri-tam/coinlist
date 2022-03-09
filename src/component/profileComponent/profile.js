import React, { useState, useEffect, useRef } from 'react'
// import profilePhoto from "../../asset/images/404_illustration_4x.png"
import avatar from "../../asset/images/avatarMe.jpg"
import roadmap from "../../asset/images/04630f86-c318-47e8-99ee-6e7311735601.png"
import vnaEducation from "../../asset/images/icon.png"
import eshope from "../../asset/images/757-3.jpg"
import crypto from "../../asset/images/Cac-tinh-nang-chu-chot-cua-san-giao-dich-phi-tap-trung-Polkastarter.jpg"
import profilePhoto from "../../asset/images/me.jpg"
import { BsTwitter, BsFillTelephoneInboundFill } from 'react-icons/bs';
import { SiFacebook } from 'react-icons/si';
import { AiFillHeart } from 'react-icons/ai';
import { MdSchool, MdWorkOutline } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdMale } from 'react-icons/io';
import { IoHeartDislikeOutline, IoClose } from 'react-icons/io5';
import { BiArchive } from 'react-icons/bi';
import { BsCamera } from 'react-icons/bs';
import { GiHumanTarget } from 'react-icons/gi';
import { FcLike } from 'react-icons/fc';
import ProgressBar from 'react-bootstrap/ProgressBar'
import ShowImage from '../../comon/reactShowImage/showImage'
import AxiosConfigSever from '../../Api/callAPI/callApiLike'
import Comment_user from './comment_user/comment_user'
import ShowComment_user from './showComment/showComment_user'
import { useSelector, useDispatch } from 'react-redux';

import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import SwalAlert from '../../comon/swalAlert/swal'

export default function Profile() {
    const authUser = useSelector(state => state.auth)
    const [like, setLike] = useState(false)
    const [countLike, setCountLike] = useState(0)
    const [postLike, setPostLike] = useState(0)
    const [showImg, setShowImg] = useState(false)
    const [showRoadMap, setShowRoadMap] = useState(false)
    const [showToolTip, setToolTip] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [showAllComment, setShowAllComment] = useState(false)


    useEffect(() => {
        AxiosConfigSever.getQuantityLikeByUserLogin()?.then(res => setCountLike(res?.data))
        // localStorage.setItem('status_Like', like)
    }, [])



    // console.log(countLike, "like");
    // const totalLike = countLike?.like?.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    // console.log(countLike?.like?.length, 777);
    const handleActionLike = () => {
        // console.log('ok');
        // localStorage.setItem('status_Like', true)
        setLike(!like)
        setPostLike(postLike + 1)
        // setCountLike(countLike + 1)
    }
    useEffect(() => {
        if (like) {
            localStorage.setItem('status_Like', like)
            const findElement = countLike?.like?.findIndex((res) => res?.user === authUser[0]?.id)
            if (findElement)
                AxiosConfigSever.postLikeByUserLogin({ user: authUser[0]?.id })
        } else {

        }
        AxiosConfigSever.getQuantityLikeByUserLogin()?.then(res => setCountLike(res?.data))
    }, [like])

    // useEffect(() => {
    //     // console.log(like, 'like');

    //     if (JSON.parse(localStorage.getItem('status_Like')) === true) {
    //         console.log('true');
    //         AxiosConfigSever.postLikeByUserLogin({ user: authUser[0]?.id })
    //     } else if (JSON.parse(localStorage.getItem('status_Like')) === false) {
    //         console.log('false');
    //         // const findElement = countLike?.like?.findIndex((res) => res?.user === authUser[0]?.id)
    //         AxiosConfigSever.deleteLikeByUserLogin(authUser[0]?.id)
    //         // console.log(findElement, '888');
    //     } else {
    //         return
    //     }
    //     AxiosConfigSever.getQuantityLikeByUserLogin()?.then(res => setCountLike(res?.data))
    // }, [localStorage.getItem('status_Like')])

    const handleClose = (status) => {
        setShowComment(status)
    }
    const handleShowImageProfile = (status) => {
        setShowImg(status)
    }

    console.log(typeof (localStorage.getItem('status_Like')), '222');
    // console.log(like, '333');
    useEffect(() => {
        setToolTip(true)
        setTimeout(() => {
            setToolTip(false)

        }, 5000);
        AxiosConfigSever.getQuantityLikeByUserLogin().then(res => res?.data)
    }, [])

    const inputEl = useRef()
    const handleShowRoadMap = () => {
        setShowRoadMap(true)
        window.scrollTo({ behavior: 'smooth', bottom: inputEl.current });
    }
    // console.log(inputEl.current, 'ref');

    return (
        <>
            <ShowComment_user show={showAllComment} handleClose={setShowAllComment} />

            <div className='profile-container'>



                <div className="profile-header">

                    <div className="profile-header-container">
                        <img src={profilePhoto} alt="" />
                        <BsCamera onClick={() => setShowImg(true)} />
                    </div>

                </div>

                {
                    showImg ? <ShowImage profilePhoto={profilePhoto} setShowImg={setShowImg} handleClose={handleShowImageProfile} /> : null
                }
                <div className="profile-main">
                    <div className="profile-main-all">
                        <div className="profile-avatar">
                            <img src={avatar} alt="" />
                        </div>
                        <ScrollAnimation animateIn='bounceInRight'>
                            <div className="profile-main-top">
                                <div className="profile-main-top-infor">
                                    <div className='d-flex infor-items'>
                                        <h4>Vũ Trí Tâm</h4>
                                        <div className='d-flex' style={{ marginLeft: "4%", lineHeight: "50%", alignItems: "center" }}>
                                            <span className='tooltip-profile' onClick={handleActionLike}>{JSON.parse(localStorage.getItem('status_Like')) === true ? <FcLike /> : <IoHeartDislikeOutline />} <span className={`${showToolTip ? "tooltiptext" : "d-none"}`}>Nhấn like để động viên tác giả ^^</span></span>

                                            <span>{countLike?.like?.length || 0}</span>
                                        </div>


                                    </div>


                                    <Comment_user show={showComment} handleClose={handleClose} />
                                    <div className='list-info'>
                                        <ul>
                                            <li> <MdSchool /><b>Tốt nghiệp:</b> cao đẳng FPT POLYTECHNIC loại: khá - giỏi</li>
                                            <li><IoMdMale /><b>Chuyên nghành:</b> Thiết kế website</li>
                                            <li><IoMdMale /><b>Giới tính:</b> Nam</li>
                                            <li><IoMdMale /><b>Ngày sinh:</b> 16/12/1999</li>
                                            <li><FaMapMarkerAlt /><b>Nơi ở hiện tại:</b> Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh.</li>
                                            <li><AiFillHeart /><b>Tình trạng quan hệ:</b> Độc thân</li>
                                        </ul>
                                    </div>

                                    {/* <p><IoMdMale />Chuyên nghành: Thiết kế website</p>
                            <p><IoMdMale />Giới tính: Nam</p>
                            <p><IoMdMale />Ngày sinh: 16/12/1999</p>
                            <p><FaMapMarkerAlt />Nơi ở hiện tại: 454 ấp vịnh, xã an cơ, huyện châu thành, tỉnh Tây Ninh</p>
                            <p><AiFillHeart />Tình trạng quan hệ: Độc thân</p> */}
                                    <div className="contact mt-3">
                                        <button className='btn-not-found active'>Liên hệ</button>
                                        <button className='btn-not-found mx-2'>Thông tin thêm</button>
                                    </div>
                                </div>
                                <div className="profile-main-top-right">
                                    <div className='list-info'>
                                        <ul>
                                            <li><BsTwitter />Twitter: <a href='https://twitter.com/Vtrtm6Vu'>https://twitter.com/Vtrtm6Vu</a></li>
                                            <li><SiFacebook />FaceBook: <a href='https://www.facebook.com/tam.vutri.37'>https://www.facebook.com/tam.vutri.37</a></li>
                                            <li><BsFillTelephoneInboundFill />Phone: 0967979049</li>
                                        </ul>
                                    </div>
                                    <div className="add_comment mx-2">
                                        <button className='btn btn-primary' onClick={() => setShowComment(true)}>+ Thêm nhận xét</button>
                                        <button className='btn btn-info mx-2' onClick={() => setShowAllComment(true)}> Hiện tất cả đánh giá</button>
                                    </div>
                                    {/* <p><BsTwitter />Twitter: https://twitter.com/Vtrtm6Vu</p>
                            <p><SiFacebook />FaceBook: https://www.facebook.com/tam.vutri.37</p>
                            <p><BsFillTelephoneInboundFill />Phone: 0967979049</p> */}
                                </div>


                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn='bounceInRight'
                        >
                            <div className="profile-main-bottom mt-5 w-100 ">
                                <div className='profile-goals'>
                                    <h5 className='flex-box'>   <div className='custom-bg-icon'><MdWorkOutline /></div>Mục tiêu nghề nghiệp</h5>
                                    <p> Có trách nhiệm trong công việc, thường xuyên là người đề xuất, đóng góp ý kiến trong team work giúp giải quyết vấn đề. Tuy rằng hiện tại kinh nghiệm chưa nhiều nhưng tôi vẫn sẽ không ngừng nỗ lực liên tục học hỏi, trau dồi khả năng. Mong muốn trong khoảng thời gian 2 năm sẽ thăng tiến xa hơn trong công việc cũng như phát triển bản thân mình. Cống hiến và tạo thêm nhiều giá trị cho công ty xứng đáng với những gì công ty đã tin tưởng</p>
                                </div>
                                <div className='profile-goals-img'>
                                    <img src={avatar} alt="" />
                                </div>

                            </div>
                        </ScrollAnimation>

                        <ScrollAnimation animateIn='bounceInRight'
                        >
                            <div className="profile-main-bottom mt-5 w-100 ">

                                <div className='profile-goals-container'>
                                    <h5 className='flex-box mb-5'>
                                        <div className='custom-bg-icon'><BiArchive /></div>
                                        Kinh nghiệm làm việc</h5>
                                    <div className='profile-goals-all'>
                                        <div className='profile-experience-img'>
                                            <img src={vnaEducation} alt="" />
                                        </div>
                                        <div className='profile-experience'>
                                            <h5 className='flex-box'>
                                                <div className='custom-bg-icon'><BiArchive /></div>
                                                Kinh nghiệm tại công ty cổ phần công nghệ quốc tế VNA-GROUP</h5>
                                            <div>
                                                <h7>Tên: WEBSITE HỆ THỐNG BETA GIÁM SÁT CHẤT LƯỢNG GIẢNG DẠY GIÁO VIÊN (VNA-EDUCATION)</h7>
                                            </div>
                                            <div>
                                                <h8>Công nghệ sử dụng: ReactJS (Hook, react-bootstraps), MongoDB, NestJS(NodeJS)</h8>
                                            </div>

                                            {/* <p className='mt-3'>Form đánh giá theo từng đối tượng:
                                                <ul>
                                                    <li>Hiệu trưởng giám sát chất lượng giảng dạy của giáo viên thông qua form đánh giá của học sinh</li>
                                                    <li>Giáo viên xem đánh giá từ học sinh, xem lịch giảng dạy</li>
                                                    <li>Học sinh đánh giá giáo viên bộ môn, chủ nhiệm thông qua form được tạo sẵn, xem lịch học và bảng tin thông báo</li>

                                                </ul>
                                            </p> */}
                                        </div>
                                    </div>
                                    <div className='profile-goals-all mt-3'>
                                        <div className='profile-experience-img'>
                                            <img src={eshope} alt="" />
                                        </div>
                                        <div className='profile-experience'>
                                            <h5 className='flex-box'>   <div className='custom-bg-icon'><BiArchive /></div>Kinh nghiệm tại FPT POLYTECHNIC</h5>
                                            <h7>WEBSITE BÁN HÀNG ONLINE</h7>
                                            <div>
                                                <h7>Tên: WEBSITE BÁN HÀNG ONLINE (ESHOPE)</h7>
                                            </div>
                                            <div>
                                                <h8>Công nghệ sử dụng: ReactJS (Hook, react-bootstraps, fomik validate form), MongoDB, ExpressJS(NodeJS)</h8>
                                            </div>

                                            {/* <p className='mt-3'>Chức năng cụ thể:
                                                <ul>
                                                    <li>Mua bán hàng : quần áo</li>
                                                    <li>Thanh toán online bằng paypal, sử dụng phiếu giảm giá</li>


                                                </ul>
                                            </p> */}
                                        </div>
                                    </div>
                                    <div className='profile-goals-all mt-3'>
                                        <div className='profile-experience-img'>
                                            <img src={crypto} alt="" />
                                        </div>
                                        <div className='profile-experience'>
                                            <h5 className='flex-box'>   <div className='custom-bg-icon'><BiArchive /></div>Kinh nghiệm tại FPT POLYTECHNIC</h5>

                                            <div>
                                                <h7>Tên: WEBSITE theo dõi giá cả các loại tiền điện tử CRYPTO (PolkastarterPOLS)</h7>
                                            </div>
                                            <div>
                                                <h8>Công nghệ sử dụng: ReactJS (Hook, react-bootstraps, redux toolkit, redux persist, fomik validate form), MongoDB, ExpressJS(NodeJS), REST API, API sàn Coinkecgo</h8>
                                            </div>

                                            {/* <p className='mt-3'>Chức năng cụ thể:
                                                <ul>
                                                    <li>Theo dõi biểu đồ các loại tiền điện tử, biểu đồ volumn giao dịch các sàn lớn (Binance, MXC, Huobi)</li>
                                                    <li>Theo dõi các top trendding đang được cộng đồng chú ý</li>
                                                    <li>Đăng ký, đăng nhập, verify (kyc để nhận coin của website)</li>
                                                    <li>Có thể lưu trữ các đồng coin tại ví của website</li>
                                                    <li>Có thể mua, bán, swap các đồng coin tại website</li>

                                                </ul>
                                            </p> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </ScrollAnimation>
                        <div className="profile-main-bottom mt-5 w-100 ">
                            <div className="d-flex profile-goals-time-container" style={{ position: "relative" }}>
                                <div className='profile-goals-time'>
                                    <h5 className='flex-box'>   <div className='custom-bg-icon'><GiHumanTarget /></div>Mục tiêu dài hạn</h5>
                                    <p>Tập trung học hỏi, cống hiến hết mình:</p>
                                    <p>Trong 1,5 năm đầu: mong muốn đạt junior developper</p>
                                    <p>Trong 2 năm: mong muốn đạt middle developper</p>
                                    <p>Trong 3 năm: mong muốn đạt senior developper</p>
                                </div>
                                <div className='profile-goals-img goals' style={{ height: "30rem" }}>
                                    <img src={roadmap} alt="" />
                                    <BsCamera onClick={() => handleShowRoadMap()} />

                                </div>
                                {
                                    showRoadMap ? <div ref={inputEl}>
                                        <div className={`zoom-img-road_map `}>
                                            <IoClose onClick={() => setShowRoadMap(false)} />
                                            <img src={roadmap} alt="" />
                                        </div>
                                        <div className='zoom-container'></div>
                                    </div> : null
                                }
                            </div>
                        </div>
                        <div className="profile-main-bottom mt-5 w-100 ">
                            <div className='profile-kill'>
                                <h5 className='flex-box'>   <div className='custom-bg-icon'><GiHumanTarget /></div>kỹ năng</h5>
                                <div className='m-3' >
                                    <label htmlFor="">HTML5/CSS3/JAVASCRIPT(ES6)</label>
                                    <ProgressBar now={60} animated label={`${60}%`} />
                                </div>
                                <div className='m-3' >
                                    <label htmlFor="">REACTJS/NODEJS(EXPRESSJS)</label>
                                    <ProgressBar now={60} animated label={`${60}%`} />
                                </div>
                                <div className='m-3' >
                                    <label htmlFor="">Kỹ năng làm việc nhóm</label>
                                    <ProgressBar now={60} animated label={`${60}%`} />
                                </div>
                                <div className='m-3' >
                                    <label htmlFor="">Thái độ</label>
                                    <ProgressBar now={80} animated label={`${80}%`} />
                                </div>

                            </div>

                        </div>
                        <div className="profile-main-bottom mt-5 w-100 mb-5 ">
                            <div className='profile-interest'>
                                <h5>Sở thích</h5>
                                <div className='profile-interest-item'>
                                    <ul>
                                        <li>Giao lưu, tò mò</li>
                                        <li>Các loại nhạc cụ: guitar, sáo</li>
                                        <li>Bơi lội, đá bóng</li>
                                        <li>Thích tham gia các buổi cộng động </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
