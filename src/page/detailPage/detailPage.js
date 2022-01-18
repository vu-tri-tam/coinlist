import React from 'react'
import DetailCoin from '../../component/detailCoinComponent/detailCoin'
import Footer from '../../component/homeComponent/footer'
import Header from '../../component/homeComponent/header'

function DetailPage() {
    return (
        <section class="container-all">
            <Header />
            <DetailCoin />
            <Footer />
        </section>
    )
}

export default DetailPage
