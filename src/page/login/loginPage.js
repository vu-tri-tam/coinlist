import React from 'react'
// import Footer from '../../component/homeComponent/footer'
import Header from '../../component/homeComponent/header'
import LoginComponent from '../../component/login/loginComponent'

export default function LoginPage() {
    return (
        <div>
            <section className="container-all">
                <Header />
                <LoginComponent />
                {/* <Footer /> */}
            </section>

        </div>
    )
}
