import React from 'react'
import Footer from '../../component/homeComponent/footer'
import Header from '../../component/homeComponent/header'
import Wallet from '../../component/walletComponent/wallet'

export default function WalletPage() {
    return (
        <>
            <section className="container-all">
                <Header />
                <Wallet />
                <Footer />
            </section>
        </>
    )
}
