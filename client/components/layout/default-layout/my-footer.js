import React from 'react'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '@/components/homepage/footer.module.scss'
import Image from 'next/image'
import Logout from '@/components/popup/logout'
import logo from '@/assets/lazyforest.png'
import { FaRegArrowAltCircleUp } from 'react-icons/fa'
import Link from 'next/link'
import LoginForm from '@/components/popup/login'

export default function MyFooter({ onShowLoginForm }) {
  const userctx = useUserContext()

  const router = useRouter()

  const handleShowLoginForm = () => {
    // 判斷如果使用者已登入
    if (userctx.user.account) {
      // 導向會員中心首頁
      router.push('/member-dashboard')
    } else {
      // 否則，開啟登入頁面
      onShowLoginForm()
    }
  }

  //回到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      scrollToTop()
    }
  }

  return (
    <>
      {/* 桌機版Footer */}
      <div className={` d-none d-md-flex ${styles.bodyWrapper}`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.itemBox}`}>
            <div className={`${styles.ftLeft}`}>
              <div>
                <ul className={`${styles.listItem}`}>
                  <li>探索更多露營區</li>
                  <li>大台北地區露營</li>
                  <li>新竹、苗栗露營</li>
                  <li>拉拉山露營</li>
                  <li>台中露營</li>
                  <li>台南露營</li>
                </ul>
              </div>
              <div className="d-flex">
                <ul className={`${styles.listItem2}`}>
                  <li>別具特色的露營裝備</li>
                  <li>帳篷天幕</li>
                  <li>野炊用具</li>
                  <li>照明燈具</li>
                  <li>貼身配件</li>
                </ul>
                <ul className={`${styles.listItem2}`}>
                  <li>coleman</li>
                  <li>snow peak</li>
                  <li>CAPTAIN STAG</li>
                  <li>D.O.D 營舞者</li>
                  <li>LOGOS</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.ftRight}`}>
              <Image src={logo} alt="" width={163} height={165} />
              {/* <button className={`${styles.loginBtn}`}>
                <div className={`${styles.loginWord}`}>登入/註冊</div>
              </button> */}
              <button
                className={`${styles.loginBtn}`}
                onClick={handleShowLoginForm}
              >
                <div className={`${styles.loginWord} ${styles.moveRight}`}>
                  登入/註冊
                </div>
                {/* </Link> */}
              </button>
              {/* <button
                className={` mt-2 ${styles.loginBtn}`}
                // onClick={handleLogout}
              >
                <div className={`${styles.loginWord} ${styles.moveRight}`}>
                  登出
                </div>
              </button> */}
              <Logout />
            </div>
          </div>
          <div>
            <p className={`${styles.statement}`}>
              © 2023 The Lazy Forest, Inc. All rights reserved.
              本網站僅作為教學使用，如有侵權請告知，會立即下架 感謝!
            </p>
          </div>
        </div>
        <div
          onClick={scrollToTop}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex="0"
          className={`${styles.backtoTop}`}
        >
          <FaRegArrowAltCircleUp className={`${styles.arrowIcon} mt-3 ms-3`} />
          <p className={`${styles.backtoTopText} mt-3`}>back to top</p>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
      {/* 手機版Footer */}
      <div className={`${styles.containerPh} d-flex d-block d-md-none`}>
        <div className={`${styles.contentPh}`}>
          <p className={`${styles.statementPh}`}>
            © 2023 The Lazy Forest, Inc. All rights reserved.
          </p>
        </div>
        {/* 回到頂部 */}
        <div
          onClick={scrollToTop}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex="0"
          className={`${styles.backtoTopPh} text-decoration-none d-flex`}
        >
          <FaRegArrowAltCircleUp
            className={`${styles.arrowIconPh} mt-3 ms-3`}
          />
          <p className={`${styles.backtoTopTextPh} mt-3`}>back to top</p>
        </div>
      </div>
    </>
  )
}
