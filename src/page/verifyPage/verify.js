import React from 'react'
import Header from '../../component/homeComponent/header'
import Footer from '../../component/homeComponent/footer'
import VerifyComponent from '../../component/verifyUser/verify'

export default function VerifyPage() {
    return (
        <div>
            <section className="container-all">
                <Header />
                <VerifyComponent />
                <Footer />
            </section>
        </div>
    )
}
