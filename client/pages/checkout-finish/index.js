import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/testcart.module.scss'
export default function CartIndex() {
  // const cart = JSON.parse(localStorage.getItem('cart'))
  // const cartData = JSON.parse(localStorage.getItem('cartdata'))
  // const checkoutData = JSON.parse(localStorage.getItem('checkoutdata'))
  const [checkoutData, setCheckoutData] = useState(null)
  useEffect(() => {
    const checkoutDataFromLocalStorage = JSON.parse(
      localStorage.getItem('checkoutdata')
    )
    if (checkoutDataFromLocalStorage)
      setCheckoutData(checkoutDataFromLocalStorage)
  }, [])

  const payMethod = checkoutData?.payMethod
  //定義變數
  const handleReset = () => {
    localStorage.setItem('cart', JSON.stringify([])) // 將 'cart' 設回空陣列
    localStorage.removeItem('cartdata') // 移除 'cartdata'
    localStorage.removeItem('checkoutdata') // 移除 'checkoutdata'
    localStorage.removeItem('store711') // 移除 'store711'
    // alert('資料已重設!') // 通知使用者資料已被重設
  }

  return (
    <>
      <div className="container">
        <div className=" cart-area">
          <div className="row">
            <h1 className={`${styles.cindytitle}`}>CHECKOUT｜結帳</h1>
          </div>
          {/* 流程圖 */}
          <div>
            <div className={`${styles.circlescontainer}`}>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 `}
              >
                <i className="bi bi-cart text-light"></i>
              </div>
              <div className={`${styles.line}`}></div>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3`}
              >
                <i className="bi bi-file-earmark-text text-light"></i>
              </div>
              <div className={`${styles.line}`}></div>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 bg-dark`}
              >
                <i className="bi bi-file-earmark-check-fill text-light"></i>
              </div>
            </div>
          </div>
          <div
            className={`m-5 p-5 d-flex justify-content-center align-items-center flex-column ${styles.finishheight}`}
          >
            <div>
              <Image
                src="./images/checkout.png"
                alt="..."
                width={300}
                height={180}
              />
            </div>
            {/* <p className="fw-bold fs-2">付款成功</p> */}
            {payMethod === 'LinePay' ? (
              <p className="fw-bold fs-2">付款成功</p>
            ) : (
              <p className="fw-bold fs-2">訂單完成</p>
            )}
            {/* 回首頁 */}
            <Link href="/index">
              <button
                onClick={handleReset}
                className={`${styles.button} btn btn-primary`}
              >
                回首頁
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
