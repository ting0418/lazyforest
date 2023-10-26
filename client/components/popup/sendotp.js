import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/context/UserContext'
import axios from 'axios'
import { useRouter } from 'next/router'
import logo from '@/assets/lazyforest.png'
import styles from './login.module.scss'
import { FaRegCircleXmark, FaCircleExclamation } from 'react-icons/fa6'
import Image from 'next/image'
import Swal from 'sweetalert2'

function SendOTP({ onCloseClick }) {
  // const [show, setShow] = useState(true)

  const router = useRouter()

  const userctx = useUserContext()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [checkpwd, setChekcPwd] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  const [message, setMessage] = useState('')
  const [hasOTP, setHasOTP] = useState(false)
  const [otp, setOtp] = useState('')

  useEffect(() => {
    setPasswordsMatch(true)
  }, [])

  const handleClose = () => onCloseClick()
  // const handleShow = () => setShow(true)

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
    setMessage('')
  }

  const handleNewPWdChange = (e) => {
    console.log(e.target.value)
    setPwd(e.target.value)
  }

  const handleNewPWdChange2 = (e) => {
    setChekcPwd(e.target.value)
    console.log(e.target.value)
    validatePwd(pwd, e.target.value)
  }

  const checkPasswordsMatch = () => {
    console.log({ checkpwd, pwd })
    validatePwd(pwd, checkpwd)
    // if (checkpwd === pwd) {
    //   setPasswordsMatch(true)
    // } else {
    //   setPasswordsMatch(false)
    // }
  }

  const validatePwd = (pwd, pwd2) => {
    setPasswordsMatch(pwd === pwd2)
  }

  const handleOPTChange = (e) => {
    setOtp(e.target.value)
  }

  // const getOtp = async () => {
  //   if (delay !== null) {
  //     setMessage('60s內無法重新獲得驗証碼')
  //     return
  //   }

  //   const res = await axios.post(
  //     'http://localhost:3005/api/reset-password/otp',
  //     {
  //       email,
  //     }
  //   )

  //   console.log(res.data)
  //   if (res.data.message === 'fail') {
  //     setMessage('驗証碼取得失敗，請確認Email是否已經註冊')
  //   }

  //   if (res.data.message === 'email sent') {
  //     setMessage('驗証碼已寄送到你填寫的Email信箱中')
  //     setCount(60) // reset countdown
  //     setDelay(1000) // 1000ms = 1s
  //   }
  // }

  const handleSubmit = async (e) => {
    console.log({ email, pwd })
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:3005/api/reset-password/otp',
        {
          email,
        }
      )

      console.log(res.data)
      if (res.data.message === 'fail') {
        setMessage('驗証碼取得失敗，請確認Email是否已經註冊')
      }

      if (res.data.message === 'email sent') {
        setHasOTP(true)
        swalsendsuc()
        // setMessage('驗証碼已寄送到你填寫的Email信箱中')
        // setCount(60) // reset countdown
        // setDelay(1000) // 1000ms = 1s
      }
      // console.log(res.data)
      // if (res.data.message === 'fail') {
      //   setLoginFailed(true)
      // } else {
      //   userctx.setUser(res.data.user)

      //   handleClose()
      //   router.push('/member-dashboard')
      // }
    } catch (ex) {
      console.log({ ex })
    }
  }

  const handleChangePwd = async (e) => {
    //
    e.preventDefault() // 避免頁面重新整理

    const res = await axios.post(
      'http://localhost:3005/api/reset-password/reset',
      {
        email,
        token: otp,
        password: pwd,
      }
    )
    console.log({ email, token: otp, password: pwd })
    if (res.data.message === 'success') {
      // setMessage('密碼已成功修改!')
      swalchangePwdsuc()
      handleClose()
    } else {
      // setMessage('密碼修改失敗!')
      swalchangePwdfail()
    }
    console.log(res.data)
  }

  const swalsendsuc = () => {
    Swal.fire({
      timer: 2000,
      title: `驗證碼已寄出`,
      text: '請至信箱查收！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  const swalchangePwdsuc = () => {
    Swal.fire({
      timer: 2000,
      title: `密碼更改成功`,
      text: '請重新登入！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  const swalchangePwdfail = () => {
    Swal.fire({
      timer: 2000,
      title: `密碼更改失敗`,
      text: '請重新輸入驗證碼，或重新發送驗證碼！',
      icon: 'error',
      showConfirmButton: false,
    })
  }

  return (
    <>
      {!hasOTP ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.modal}>
            <div className={styles.modal_content}>
              <span className={styles.close} onClick={handleClose}>
                <FaRegCircleXmark className={styles.close_icon} />
              </span>
              <div>
                <Image
                  src="/member-center/forgot-password-icon.svg"
                  alt="logo"
                  width={300}
                  height={148}
                />
              </div>
              <div className={styles.inputbox}>
                <div className={styles.form_title}>信箱</div>
                <input
                  type="email"
                  className={`form-control ${styles.form_input}`}
                  placeholder="請輸入註冊電子信箱"
                  onChange={handleEmailChange}
                />
              </div>
              <button className={styles.btn} type="submit">
                發送驗證碼
              </button>
              <div>{message}</div>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleChangePwd}>
          <div className={styles.modal}>
            <div className={styles.modal_content}>
              <span className={styles.close} onClick={handleClose}>
                <FaRegCircleXmark className={styles.close_icon} />
              </span>
              <div>
                <Image
                  src="/member-center/password-change.svg"
                  alt="logo"
                  width={300}
                  height={148}
                />
              </div>
              <div className={styles.inputbox}>
                <div className={styles.form_title}>驗證碼</div>
                <input
                  type="text"
                  className={`form-control ${styles.form_input}`}
                  placeholder="請輸入驗證碼"
                  value={otp}
                  onChange={handleOPTChange}
                />
              </div>
              <div className={styles.inputbox}>
                <div className={styles.form_title}>新密碼</div>
                <input
                  type="password"
                  className={`form-control ${styles.form_input}`}
                  placeholder="請輸入新密碼"
                  value={pwd}
                  onChange={handleNewPWdChange}
                />
              </div>
              <div className={styles.inputbox}>
                <div className={styles.form_title}>再次輸入</div>
                <input
                  type="password"
                  className={`form-control ${styles.form_input}`}
                  placeholder="請再次輸入新密碼"
                  value={checkpwd}
                  onChange={handleNewPWdChange2}
                  onBlur={checkPasswordsMatch}
                />
                {!passwordsMatch && <p>密碼不匹配，請重新輸入</p>}
              </div>
              <button className={styles.btn} type="submit">
                確定變更密碼
              </button>
              <div>{message}</div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default SendOTP
