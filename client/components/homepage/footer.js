import React from 'react'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/router'
import styles from '@/components/homepage/footer.module.scss'
import Image from 'next/image'
import logo from '@/assets/lazyforest.png'
import { FaArrowCircleUp } from 'react-icons/fa'
import Link from 'next/link'

export default function footer(onShowLoginForm) {
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

  return (
    <div className={`${styles.body}`}>
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
            <div>
              <ul className={`${styles.listItem}`}>
                <li>別具特色的露營裝備</li>
                <li>帳篷天幕</li>
                <li>野炊用具</li>
                <li>照明燈具</li>
                <li>貼身配件</li>
              </ul>
            </div>
          </div>
          {/* LOGO */}
          <div className={`${styles.ftRight}`}>
            <Image src={logo} alt="" width={163} height={165} />
            <Link href="" className={`${styles.loginBtn}`}>
              <div className={`${styles.loginWord}`}>登入/註冊</div>
            </Link>
          </div>
        </div>
        {/*  */}
        <div>
          <p className={`${styles.statement}`}>
            © 2023 The Lazy Forest, Inc. All rights reserved.
            本網站僅作為教學使用，如有侵權請聯繫:0912345678 Ｘ先生
          </p>
        </div>
      </div>
      <div className={`${styles.backtoTop}`}>
        <FaArrowCircleUp className={`${styles.arrowUp}`} />
        <a>back to top</a>
      </div>
    </div>
  )
}
