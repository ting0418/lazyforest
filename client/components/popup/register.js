import React, { useState, useEffect } from 'react'
import logo from '@/assets/lazyforest.png'
import styles from './register.module.scss'
import { FaRegCircleXmark, FaCircleExclamation } from 'react-icons/fa6'
import Image from 'next/image'
import Swal from 'sweetalert2'

function RegisterForm({ onCloseClick, onShowLoginForm }) {
  const [email, setEmail] = useState(null)
  const [username, setUserName] = useState(null)

  const [password, setPassword] = useState(null)
  const [repassword, setRePassword] = useState(null)
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  useEffect(() => {
    setPasswordsMatch(true)
  }, [])

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value)
    validatePwd(password, e.target.value)
  }

  const checkPasswordsMatch = () => {
    validatePwd(password, repassword)
  }

  const validatePwd = (pwd, pwd2) => {
    setPasswordsMatch(pwd === pwd2)
  }

  const handleClose = () => onCloseClick()
  const handleShowLoginForm = () => {
    onShowLoginForm()
  }

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handleUserNameChange = (e) => {
    console.log(e.target.value)
    setUserName(e.target.value)
  }

  const handleSubmit = async (e) => {
    console.log({ email, password })
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3005/api/users', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: "follow", // manual, *follow, error
        //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          account: email,
          name: username,
          password: password,
        }), // body data type must match "Content-Type" header
      })

      const data = await response.json()
      console.log({ data })
      swalregistersuc()
      handleClose()
      // handleShowLoginForm()
    } catch (ex) {
      console.log({ ex })
    }
  }

  const swalregistersuc = () => {
    Swal.fire({
      timer: 2000,
      title: `註冊成功`,
      text: '請登入！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  return (
    <>
      {/* <button className="btn btn-warning px-4 m-4" onClick={handleShow}>
        註冊
      </button> */}
      {/* {show && ( */}
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
                input="email"
                className={`form-control ${styles.form_input}`}
                placeholder="請輸入電子信箱"
                onChange={handleEmailChange}
              />
            </div>
            <div className={styles.inputbox}>
              <div className={styles.form_title}>使用者名稱</div>
              <input
                input="text"
                className={`form-control ${styles.form_input}`}
                placeholder="請輸入姓名"
                onChange={handleUserNameChange}
              />
            </div>
            <div className={styles.inputbox}>
              <div className={styles.form_title}>密碼</div>
              <input
                type="password"
                className={`form-control ${styles.form_input}`}
                placeholder="請輸入密碼"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className={styles.inputbox}>
              <div className={styles.form_title}>再次輸入密碼</div>
              <input
                type="password"
                className={`form-control ${styles.form_input}`}
                placeholder="請再次輸入密碼"
                value={repassword}
                onChange={handleRePasswordChange}
                onBlur={checkPasswordsMatch}
              />
              {!passwordsMatch && (
                <div className={styles.warning}>
                  <FaCircleExclamation className={styles.icon} />
                  <span className={styles.warning_text}>
                    密碼不匹配，請重新輸入
                  </span>
                </div>
              )}
            </div>
            <button className={styles.btn} type="submit">
              註冊
            </button>
            <p className={styles.fz}>
              已經是自己人了嗎？
              <a
                href="javascript:void(0)"
                className={styles.a}
                onClick={handleShowLoginForm}
              >
                立即登入
              </a>
            </p>
          </div>
        </div>
      </form>
      {/* )} */}
    </>
  )
}

export default RegisterForm
