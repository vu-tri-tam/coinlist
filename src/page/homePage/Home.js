import React from 'react'
import { useRouteMatch } from 'react-router'
import PopupEvent from '../../comon/popupEvent'
import Footer from '../../component/homeComponent/footer'
import Header from '../../component/homeComponent/header'
import BottomMain from '../../component/homeComponent/main'
import TopMain from '../../component/homeComponent/topMain'

export default function HomePage() {
    const match = useRouteMatch()
    console.log(match);
    return (
        <div className="position-relative">
            {
                match.path === '/' ? <PopupEvent /> : null
            }
            <section className="container-all">

                <Header />

                <TopMain />
                <BottomMain />
                <Footer />
            </section>
        </div>
    )
}
