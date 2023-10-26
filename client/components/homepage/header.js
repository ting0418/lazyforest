import React from 'react'
import styles from '@/components/homepage/header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      {/* 桌機版 */}
      <div className={`${styles.headerContainer} d-none d-md-block`}>
        <img
          className={`${styles.homeImg}`}
          src="/images/header2.jpg"
          alt=""
        />
        <div className={`d-flex`}>
          <Link
            href="/camp/category"
            className={`col d-flex justify-content-center ${styles.blockLeft}`}
          >
            <img
              className={`${styles.logoImg}`}
              src="./images/homepage/lazyforest-face.png"
              alt=""
            />
            <p>快速找營位</p>
          </Link>
          <Link
            href="/product"
            className={`col d-flex justify-content-center ${styles.blockRight}`}
          >
            <img
              className={`${styles.logoImg}`}
              src="./images/homepage/lazyforest-face.png"
              alt=""
            />
            <p>快速找裝備</p>
          </Link>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
      {/* 手機版 */}
      {/* 從這邊開始寫，照著figma切 */}
      <div className="d-block d-md-none container p-0">
      <img
          className={`${styles.homeImgPh}`}
          src="/images/header2.jpg"
          alt=""
        />
        <div className={`d-flex`}>
          <Link
            href="/camp/category"
            className={`col d-flex justify-content-center ${styles.blockLeft}`}
          >
            <p>快速找營位</p>
          </Link>
          <Link
            href="/product"
            className={`col d-flex justify-content-center ${styles.blockRight}`}
          >
            <p>快速找裝備</p>
          </Link>
        </div>
      </div>
    </>
  )
}
