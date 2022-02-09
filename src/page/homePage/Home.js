import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import TrenddingCoin from '../../comon/introduceHotCoin/trenddingCoin'
import PopupEvent from '../../comon/popupEvent'
import Footer from '../../component/homeComponent/footer'
import Header from '../../component/homeComponent/header'
import BottomMain from '../../component/homeComponent/main'
import TopMain from '../../component/homeComponent/topMain'

export default function HomePage() {
    const match = useRouteMatch()
    // console.log(match);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="position-relative">
            {
                match.path === '/' ? <PopupEvent /> : null
            }
            <section className="container-all">

                <Header />
                <TrenddingCoin />
                <TopMain />
                <BottomMain />
                <Footer />
            </section>
        </div>
    )
}
