import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/testcart.module.scss'
export default function CartIndex() {
  // const cart = JSON.parse(localStorage.getItem('cart'))
  // const cartData = JSON.parse(localStorage.getItem('cartdata'))
  // const checkoutData = JSON.parse(localStorage.getItem('checkoutdata'))
  const [orderCheckoutData, setOrderCheckoutData] = useState(null)
  useEffect(() => {
    const ordercheckoutDataFromLocalStorage = JSON.parse(
      localStorage.getItem('ordercheckoutData')
    )
    if (ordercheckoutDataFromLocalStorage)
      setOrderCheckoutData(ordercheckoutDataFromLocalStorage)
  }, [])

  const payMethod = orderCheckoutData?.payMethod

  //定義變數
  const handleReset = () => {
    localStorage.removeItem('reservationData') // 移除 'reservationData'
    localStorage.removeItem('ordercheckoutData') // 移除 'ordercheckoutData'
    localStorage.removeItem('orderData') // 移除 'orderData'
    localStorage.removeItem('startDate') // 移除 'startDate'
    localStorage.removeItem('endDate') // 移除 'endDate'
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
            {payMethod === 'LINEPAY' ? (
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
