import React from 'react'
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiOutlineSearch } from 'react-icons/ai';
export default function Footer() {
    return (
        <div>
            <section className="section-item">
                <div className="primary-footer border-top">
                    <ul id="theme-switcher" className="theme-switcher p-0">
                        <li className="dark">
                            {/**/}
                        </li>
                        <li className="light">
                            <span>
                                <img width={24} height={24} alt="light" src="./images/images (1).png" />
                            </span>
                            {/**/}
                        </li>
                        {/**/}
                    </ul>
                    <div className="w-100">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-5 logo_wrapper">
                                <a href="/" className="footer-logo">
                                    <img width={60} height={25} className="img-fluid  ng-lazyloaded" alt="DAO Maker" src="./images/zill.png" />
                                    {/**/}
                                    {/**/}
                                </a>
                                <div className="input-group flex-nowrap mt-3 mb-3">


                                    <input type="text" className="form-control" placeholder="Sign up" aria-label="Username" aria-describedby="addon-wrapping" />
                                    <span className="input-group-text" id="addon-wrapping"><AiOutlineSearch /></span>
                                </div>

                                <div className="social-links">
                                    <ul className="p-0 ">
                                        <li>
                                            <a href="https://twitter.com/thedaomaker" target="_blank">
                                                <AiFillFacebook style={{ fontSize: "30px" }} />

                                            </a>
                                        </li>
                                        <li>
                                            <AiOutlineTwitter style={{ fontSize: "30px" }} />
                                        </li>
                                        <li>
                                            <AiFillInstagram style={{ fontSize: "30px" }} />
                                        </li>
                                    </ul>
                                </div>
                                <div className="copyright">Copyright © 2021 DAO Maker and crypto price</div>
                            </div>
                            <div className="footer_link_wrapper col-xl-9 col-lg-8 col-md-7">
                                <div className="row no-gutters">
                                    <div className="col-md-3 footer_links">
                                        <h5 >COMPANY</h5>
                                        <ul className="p-0 d-flex flex-column">
                                            <li><a routerlink="/" routerdirection="forward">Home</a></li>
                                            <li><a href="https://learn.daomaker.com" target="_blank">Learn</a></li>
                                            <li><a routerlink="/vault" routerdirection="root" routerlinkactive="active-link">
                                                Staking </a></li>
                                            <li><a href="https://learn.daomaker.com/about" target="_blank">About</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 footer_links">
                                        <h5>RESOURCES</h5>
                                        <div className="row">
                                            <div className="col-lg-6 col-resources">
                                                <ul className="p-0 d-flex flex-column">
                                                    <li><a href="https://drive.google.com/drive/folders/1cuLFTtvZE-lccjheB6kXEh7moI7yMfHA" target="_blank">Brand Assets</a></li>
                                                    <li><a href="https://daomaker.com/socialmining" target="_blank">Social
                                                        Mining Deck</a></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-resources">
                                                <ul className="p-0">
                                                    <li><a href="https://drive.google.com/open?id=1tPRMktnros6ifJLfvQkrT6mAmEJvUufT" target="_blank">DAO Maker Whitepaper</a></li>
                                                    <li><a href="https://drive.google.com/file/d/1ZZUVyQXnBgLaqWqv7qRnU0jNpEyxEkff/view?usp=sharing" target="_blank">DAO Maker Economics Paper</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 footer_links">
                                        <h5>USEFUL LINKS</h5>
                                        <ul className="p-0 d-flex flex-column">
                                            <li><a href="https://medium.com/daomaker" target="_blank">Blog</a></li>
                                            <li><a routerlink="/privacy-policy">Privacy Policy</a></li>
                                            <li><a routerlink="/terms-and-conditions">Terms and Conditions</a></li>
                                            <li><a href="http://support.daomaker.com/" target="_blank">Support</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**/}
                    {/**/}
                </div>
            </section>

        </div>
    )
}
