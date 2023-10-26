import React, { useState } from 'react'
import { useUserContext } from '@/context/UserContext'
import axios from 'axios'
import { useRouter } from 'next/router'
import logo from '@/assets/lazyforest.png'
import styles from './login.module.scss'
import { FaRegCircleXmark, FaCircleExclamation } from 'react-icons/fa6'
import Image from 'next/image'
import Swal from 'sweetalert2'

function Login({ onCloseClick, ShowRegisterForm, ShowSendOTP }) {
  // const [show, setShow] = useState(true)

  const router = useRouter()

  const userctx = useUserContext()

  const [email, setEmail] = useState(null)
  const [pwd, setPwd] = useState(null)
  const [loginFailed, setLoginFailed] = useState(false)

  const [category, setCotegory] = useState('login')

  // function PopupLayout() {
  //   return (
  //     category === 'login' ? (
  //       <div>
  //         {/* 這裡是login 的 Layout */}
  //       </div>
  //     ) : (
  //       <div>
  //         {/* 這裡是 register 的 Layout */}
  //       </div>
  //     )
  //   );
  // }

  const handleClose = () => onCloseClick()
  // const handleShow = () => setShow(true)

  const handleOpenRegister = () => {
    ShowRegisterForm()
  }
  const handleShowSendOtp = () => {
    ShowSendOTP()
  }

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handlePwdChange = (e) => {
    console.log(e.target.value)
    setPwd(e.target.value)
  }

  const handleSubmit = async (e) => {
    console.log({ email, pwd })
    e.preventDefault()

    const swalloginsuc = () => {
      Swal.fire({
        timer: 2000,
        title: `登入成功`,
        text: '歡迎回來LazyForest！',
        icon: 'success',
        showConfirmButton: false,
      })
    }

    try {
      const res = await axios.post(
        'http://localhost:3005/api/auth/login',
        { account: email, password: pwd },
        {
          withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
        }
      )
      swalloginsuc()
      console.log(res.data)
      if (res.data.message === 'fail') {
        setLoginFailed(true)
      } else {
        userctx.setUser(res.data.user)

        handleClose()
        // router.push('/member-dashboard')
      }

      /*
      const response = await fetch('http://localhost:3005/api/auth/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: "follow", // manual, *follow, error
        //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ account: email, password: pwd }), // body data type must match "Content-Type" header
      })

      const data = await response.json()
      console.log({ data })
      userctx.setUser(data.user)
      handleClose()
      router.push('/member-dashboard')
*/
    } catch (ex) {
      console.log({ ex })
    }
  }

  return (
    <>
      {/* <button className="btn btn-warning px-4 m-4" onClick={handleShow}>
        登入
      </button> */}
      <form onSubmit={handleSubmit}>
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={handleClose}>
              <FaRegCircleXmark className={styles.close_icon} />
            </span>
            <div>
              <Image src={logo} alt="logo" className={styles.logo_size} />
            </div>
            <div className={styles.inputbox}>
              <div className={styles.form_title}>帳號</div>
              <input
                type="email"
                className={`form-control ${styles.form_input}`}
                placeholder="請輸入電子信箱"
                onChange={handleEmailChange}
              />
            </div>
            <div className={styles.inputbox}>
              <div className={styles.form_title}>密碼</div>
              <input
                type="password"
                className={`form-control ${styles.form_input}`}
                placeholder="請輸入密碼"
                onChange={handlePwdChange}
              />
            </div>
            <div className={`${loginFailed ? '' : 'd-none'} ${styles.warning}`}>
              <FaCircleExclamation className={styles.icon} />
              <span className={styles.warning_text}>登入失敗</span>
            </div>
            <button type="submit" className={styles.btn}>
              登入
            </button>
            <span>
              <a
                href="javascript:void(0)"
                className={styles.a}
                onClick={handleShowSendOtp}
              >
                忘記密碼?
              </a>
            </span>
            <p className={styles.fz}>
              剛加入露營圈嗎？
              <a
                href="javascript:void(0)"
                className={styles.a}
                onClick={handleOpenRegister}
              >
                建立新帳號
              </a>
            </p>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
