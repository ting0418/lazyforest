import React, { useState } from 'react'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/router'
import logo from '@/assets/lazyforest.png'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/components/homepage/aside.module.scss'
import { FaShoppingCart, FaMapMarkedAlt } from 'react-icons/fa'
import LoginForm from '@/components/popup/login'
import {
  FiMenu,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  HiHome,
} from 'react-icons/fi'
import Burger from '../layout/default-layout/burger'

function Aside({ onShowLoginForm }) {
  const userctx = useUserContext()

  const router = useRouter()
  const { pathname } = router

  let asideContent

  const [menuOpen, setMenuOpen] = useState(false)

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

  const isActive = (...pathNow) => {
    if (!pathNow.length) return ''

    const findPath = pathNow.find((v, i) => {
      return router.pathname.includes(v)
    })

    if (findPath) {
      return '-active'
    } else {
      return ''
    }
  }

  //------------------------ 會員中心登入aside ---------------------------------//
  if (
    pathname === '/member-dashboard' ||
    pathname === '/member-dashboard/my-map' ||
    pathname === '/member-dashboard/order-record' ||
    pathname === '/member-dashboard/voucher' ||
    pathname === '/member-dashboard/favorite'
  ) {
    asideContent = (
      <div>
        <div className={`${styles.nav} d-none d-md-flex`}>
          {/* 桌機 */}
          <div className={`${styles.centeredContent} `}>
            <Link href="/index">
              <Image
                src={logo}
                alt=""
                width={146}
                height={148}
                className={`${styles.hideImage}`}
              />
            </Link>
          </div>

          <ul className={`${styles.centeredUl} ${styles.mobileMenu}`}>
            <Link href="/member-dashboard">
              <li>
                <button
                  className={`${
                    styles['firstListbtn' + isActive('/camp/category')]
                  }`}
                >
                  <p className={`${styles.bookCamping}`}>INTRODUCE</p>
                  <p className={`${styles.campReservation}`}>基本資料</p>
                </button>
              </li>
            </Link>

            <Link href="/member-dashboard/favorite">
              <li>
                <button className={`${styles.shoppingBtn}`}>
                  <p className={`${styles.shopping}`}>WISH LIST</p>
                  <p className={`${styles.sale}`}>我的最愛</p>
                </button>
              </li>
            </Link>

            <Link href="/member-dashboard/order-record">
              <li>
                <button className={`${styles.communicateBtn}`}>
                  <p className={`${styles.communicate1}`}>ORDER RECORD</p>
                  <p className={`${styles.communicate2}`}>訂單記錄</p>
                </button>
              </li>
            </Link>

            <Link href="/member-dashboard/voucher">
              <li>
                <button className={`${styles.communicateBtn}`}>
                  <p className={`${styles.communicate1}`}>VOUCHER</p>
                  <p className={`${styles.communicate2}`}>優惠券</p>
                </button>
              </li>
            </Link>
          </ul>

          <div className={`${styles.journey} mt-5`}>
            <Link href="/index" className={`${styles.journeyR} d-flex`}>
              <FaShoppingCart className={`${styles.mapMarket}`} />
              <p>回首頁</p>
            </Link>

            <Link href="/index" className={`${styles.journeyL} d-flex`}>
              <FiLogOut className={`${styles.shoppingCart}`} />
              <p className="ms-1">登出</p>
            </Link>
          </div>
          {/* <button
            className="btn btn-warning px-4 m-4"
            onClick={handleShowLoginForm}
          >
            會員中心
          </button>
          <Link href="/member-dashboard/voucher">優惠卷</Link> */}
        </div>
      </div>
    )
    /// 其餘頁面aside ///
  } else {
    asideContent = (
      <div className={`${styles.nav} d-none d-md-flex`}>
        {/* 桌機 */}
        <div className={`${styles.centeredContent} `}>
          <Link href="/index">
            <Image
              src={logo}
              alt=""
              width={146}
              height={148}
              className={`${styles.hideImage}`}
            />
          </Link>
        </div>

        <ul className={`${styles.centeredUl} ${styles.mobileMenu}`}>
          {/* 營地 */}
          <li>
            <Link href="/camp/category">
              <button
                className={`${
                  styles['firstListbtn' + isActive('/camp/category')]
                }`}
              >
                <p className={`${styles.bookCamping}`}>BOOK CAMPING</p>
                <p className={`${styles.campReservation}`}>營地預約</p>
              </button>
            </Link>
          </li>
          {/* 商品 */}
          <li>
            <Link href="/product">
              <button
                className={`${
                  styles['shoppingBtn' + isActive('/product', '/product/list')]
                }`}
              >
                <p className={`${styles.shopping}`}>SHOPPING</p>
                <p className={`${styles.sale}`}>裝備販售</p>
              </button>
            </Link>
          </li>

          {/* 討論區 */}
          <li>
            <Link href="/forum/post-list">
              <button
                className={`${
                  styles['communicateBtn' + isActive('/forum/post-list')]
                }`}
              >
                <p className={`${styles.communicate1}`}>COMMUNICATE</p>
                <p className={`${styles.communicate2}`}>討論區</p>
              </button>
            </Link>
          </li>
        </ul>

        {/* 會員中心 */}
        <div
          href="/member-dashboard"
          className={styles.customLink}
          onClick={handleShowLoginForm}
        >
          <div className={`${styles.memberCenterOutside} d-flex`}>
            <div className={`${styles.memberCenter} d-flex`}>
              <div className={`${styles.circle}`}>
                <img
                  width={42}
                  height={42}
                  className={`${styles.logoImg}`}
                  src="/images/homepage/lazyforest-face.png"
                  alt=""
                />
              </div>
              <div className={`${styles.userContainer}`}>
                <p className={`${styles.hi}`}>
                  Hi,<span>{userctx.user.name || ''}</span>
                </p>
                <p className={`${styles.user}`}>會員中心</p>
              </div>
            </div>
          </div>
        </div>
        {/* 購物車/行程 */}
        <div className={`${styles.journey}`}>
          <Link href="/order" className={`${styles.journeyR} d-flex`}>
            <FaMapMarkedAlt className={`${styles.mapMarket}`} />
            <p>行程</p>
          </Link>

          <Link href="/cart" className={`${styles.journeyL} d-flex`}>
            <FiShoppingCart className={`${styles.shoppingCart}`} />
            <p className="ms-2">購物車</p>
          </Link>
        </div>
        {/* <button
          className="btn btn-warning px-4 m-4"
          onClick={handleShowLoginForm}
        >
          會員中心
        </button> */}
        {/* <Link className="btn btn-dark" href="/member-dashboard/voucher">
          優惠卷
        </Link>
        <Link className="btn btn-dark" href="/member-dashboard/favorite">
          我的最愛
        </Link>
        <Link className="btn btn-dark" href="/member-dashboard/order-record">
          訂單紀錄
        </Link> */}
      </div>
    )
  }
  return (
    <>
      <aside>{asideContent}</aside>

      {/* 手機 */}
      <div className={`${styles.phoneNav} d-block d-md-none container p-0`}>
        <div className={`${styles.headLazy}`}>
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <Burger />
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <Burger />
          </div>
          <Link href="/index" className={`${styles.lazy} pt-5`}>
            LAZY FOREST
          </Link>
          <div className={`${styles.icons} d-flex`}>
            <div>
              <FiUser
                className={`${styles.fiUser} mt-5 `}
                onClick={handleShowLoginForm}
              />
            </div>
            {/* 購物車 */}
            <div>
              {/* <FiShoppingCart className={`${styles.shoppingCart} mt-5 ms-3`} /> */}
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle p-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FiShoppingCart
                    className={`${styles.shoppingCartPh} mt-5 p-0 ms-1`}
                  />
                </button>
                <div className="dropdown-menu">
                  <div>
                    <Link href="/cart" className="text-decoration-none">
                      <p className="dropdown-item">商品購物車</p>
                    </Link>
                  </div>
                  <li>
                    <Link href="/order" className="text-decoration-none">
                      <div className="dropdown-item">營地購物車</div>
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Aside
