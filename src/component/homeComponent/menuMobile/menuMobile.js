import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import {

    Link,


} from "react-router-dom";
import { IoClose } from 'react-icons/io5';
import { GiMining, GiConfirmed } from 'react-icons/gi';
import { AiOutlineHistory } from 'react-icons/ai';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import { ImProfile, ImFire } from 'react-icons/im';

export default function MenuMobile({ setDisplayMenu, asset_platforms, authUser, handleLogOut, match }) {

    return <div className="bar-reponsive ">
        <div className='option-logo'>
            <Link to="/" className=" titlbracum-left d-flex ">
                <span className="mx-2"><img src="./images/pols.png" width={30} height={30} /></span>
                <h5 className="m-0">Polkastater<span>POLS</span></h5>
            </Link>
            <IoClose onClick={() => setDisplayMenu(false)} />
        </div>
        <Accordion flush>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Wallet</Accordion.Header>
                <Accordion.Body>
                    <div className="custom-wallet-menu"><Link to="/wallet-page"><span><RiMenuUnfoldFill className="mx-2" />Tổng quan ví</span></Link></div>
                    <div className="custom-wallet-menu"><Link><span><GiMining className="mx-2" />Đào coin</span></Link></div>
                    <div className="custom-wallet-menu"><Link><span><AiOutlineHistory className="mx-2" />Lịch sử </span></Link></div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>English</Accordion.Header>
                <Accordion.Body>
                    <Link className="dropdown-item" to="#">Vietnam</Link>
                    <Link className="dropdown-item" to="#">China</Link>
                    <Link className="dropdown-item" to="#">English</Link>
                </Accordion.Body>
            </Accordion.Item>
            {

                match.path.slice(1, 12) === '' ? null :
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Platforms</Accordion.Header>
                        <Accordion.Body>
                            <ul style={{ maxHeight: "400px", overflowY: "scroll" }}>
                                {

                                    asset_platforms?.map((e, i) => {
                                        return <li className="w-100"><Link className="dropdown-item" to={e?.id}>{e?.name}</Link></li>
                                    })
                                }

                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
            }
            {
                authUser?.length > 0 ? <Accordion.Item eventKey="3">

                    <Accordion.Header>{authUser[0]?.userName}</Accordion.Header>
                    <Accordion.Body>
                        <Link className="dropdown-item" to="#" onClick={() => handleLogOut()}><BiLogOut className='mx-2' />Logout</Link>
                        <Link className="dropdown-item" to="/profile-page" ><ImProfile className='mx-2' />Profile</Link>
                        <Link className="dropdown-item" to="/verify-page"><GiConfirmed className='mx-2' />verify</Link>
                    </Accordion.Body>
                </Accordion.Item> :
                    <div className='option-auth'>
                        <Link to="/login-page" className="btn rounded-pill p-0 ">Login</Link>
                        <button className="btn btn-primary rounded-pill ml-3"><Link to="/sign-up" className="text-white">Sign up</Link></button>

                    </div>
            }

            {/* <div className={`dropdown ml-3 ${match.path.slice(1, 12) === '' ? "d-none" : "d-block"}`}>
          <a className="dropdown-toggle text-dark" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Platforms
          </a>
          <ul className="dropdown-menu dropdown_menu-9" aria-labelledby="dropdownMenuLink" style={{ maxHeight: "400px", overflowY: "scroll" }}>
              {

                  asset_platforms?.map((e, i) => {
                      return <li className="w-100"><Link className="dropdown-item" to={e?.id}>{e?.name}</Link></li>
                  })
              }

          </ul>
      </div> */}

        </Accordion>


    </div>
}
