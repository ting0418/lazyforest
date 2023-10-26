// import NextBreadCrumb from '@/components/common/next-breadcrumb'
import MyFooter from './my-footer'
import Head from 'next/head'
import { UserContext, UserProvider } from '@/context/UserContext'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Aside from '@/components/homepage/aside'
import styles from '@/components/layout/default-layout/layout.module.scss'
import Image from 'next/image'
import LoginForm from '@/components/popup/login'
import RegisterForm from '@/components/popup/register'
import SendOTP from '@/components/popup/sendotp'
// import MyNavbar from './my-navbar'
import Swal from 'sweetalert2'

export default function DefaultLayout({ title = '', children }) {
  // const navigate = useNavigate()

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showSendOtp, setShowSendOtp] = useState(false)

  const handleShowLoginForm = () => {
    setShowLogin(true)
    setShowRegister(false)
  }

  const handleHideLoginForm = () => {
    setShowLogin(false)
  }

  const hanldOpenRegisterForm = () => {
    setShowRegister(true)
    setShowLogin(false)
  }

  const hanldCloseRegisterForm = () => {
    setShowRegister(false)
  }

  const handleShowSendOtp = () => {
    setShowSendOtp(true)
    setShowLogin(false)
  }

  const handleHideSendOtp = () => {
    setShowSendOtp(false)
  }

  const handleAfterLogin = () => {
    // navigate('/member-dashboard')
  }

  return (
    <>
      <UserProvider>
        <Head>
          <title>{`lazyForest`}</title>
          <meta name="viewport" content="width=device-width" />
        </Head>
        {/* <MyNavbar /> */}
        <Aside className={`d-none`} onShowLoginForm={handleShowLoginForm} />
        <div className={` ${styles.mainWrapper}`}>
          <main className={` ${styles.mainContent}`}>{children}</main>
          <MyFooter
            className={` ${styles.myFooter}`}
            onShowLoginForm={handleShowLoginForm}
          />
        </div>
        {showLogin && (
          <LoginForm
            onCloseClick={handleHideLoginForm}
            ShowRegisterForm={hanldOpenRegisterForm}
            ShowSendOTP={handleShowSendOtp}
            afterLogin={handleAfterLogin}
          />
        )}

        {showRegister && (
          <RegisterForm
            onCloseClick={hanldCloseRegisterForm}
            onShowLoginForm={handleShowLoginForm}
          />
        )}

        {showSendOtp && <SendOTP onCloseClick={handleHideSendOtp} />}
      </UserProvider>
    </>
  )
}
