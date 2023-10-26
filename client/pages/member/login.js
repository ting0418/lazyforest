import React, { useState } from 'react'
import Popup from '@/components/popup/login'
import { FaRegCircleXmark } from 'react-icons/fa6'
import logo from '@/assets/lazyforest.png'
import styles from '@/components/popup/login.module.scss'
import Image from 'next/image'

const Login = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const handleLogin = () => {
    // 在这里处理登录逻辑，可以向服务器发送登录请求
    console.log(
      'Logging in with username:',
      username,
      'and password:',
      password
    )
    // 这里可以添加实际的登录逻辑，例如使用 fetch 或 axios 发送登录请求
    // 如果登录成功，你可以关闭弹出窗口
    closePopup()
  }

  return (
    <div>
      <h1>Login System</h1>
      <button onClick={openPopup}>Login</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
      <div className={styles.sing_in}>
      <div className={styles.sign_in_wrapper}>
        <div className={styles.sign_in}>
        <FaRegCircleXmark size={32} color="#3e3b35" />
          <div className={styles.frame}>
            <div className={styles.logo}>
            <Image src={logo} alt="" width={146} height={148} />
      </div>
            </div>
            <div className={styles.div}>
              <div className={styles.input}>
                <div className={styles.form_control}>帳號*</div>
                <input className={styles.text_input} 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <div className={styles.form_control}>密碼*</div>
                <input className={styles.text_input}
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
              </div>
              <div className={styles.text_wrapper}>忘記密碼？</div>
            </div>
            <div className={styles.frame}>
              <button className={styles.button} onClick={handleLogin}>
                <button className={styles.div_wrapper}>
                  <div className={styles.text_wrapper_2}>登入</div>
                </button>
              </button>
              <p className={styles.p}>
                <span className={styles.span}>剛加入露營圈嗎？&nbsp;&nbsp; </span>
                <span className={styles.text_wrapper_3}>建立新帳號</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      </Popup>
    </div>
  )
}

export default Login
