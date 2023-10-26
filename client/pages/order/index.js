import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/testcart.module.scss'
import moment from 'moment'
// import List from '@/components/cart/list'
import Order from '@/components/cart/order'
// import { useCart } from '@/hooks/use-cart'
export default function CartIndex() {
  // 建立狀態變數

  //EDDY
  // const {
  //   cart,
  //   items,
  //   addItem,
  //   removeItem,
  //   updateItem,
  //   clearCart,
  //   isInCart,
  //   plusOne,
  //   minusOne,
  // } = useCart()

  const [reservationData, setReservationData] = useState([])
  const [startDate, setStartDate] = useState([])
  const [endDate, setEndDate] = useState([])

  // 使用 useEffect 從 localStorage 中取得資料並設定 reservationData 狀態
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reservationData'))
    if (data) {
      setReservationData(data)
    }
    const data2 = localStorage.getItem('startDate')
    if (data2) {
      setStartDate(data2)
    }
    const data3 = localStorage.getItem('endDate')
    if (data3) {
      setEndDate(data3)
    }
  }, [])

  const formattedDate = moment().format('YYYY-MM-DD')

  const [totalFromChild, setTotalFromChild] = useState(0)

  const handleTotalChange = (total) => {
    setTotalFromChild(total)
  }

  const handleSubmit = () => {
    const orderData = {
      netTotal: totalFromChild,
      orderDate: formattedDate,
    }
    localStorage.setItem('orderData', JSON.stringify(orderData))
  }
  return (
    <>
      <div className="container">
        <div className=" cart-area">
          <div className="row">
            <h1 className={`${styles.cindytitle}`}>CONFIRM | 預約確認</h1>
          </div>
          {/* 流程圖 */}
          <div>
            <div className={`${styles.circlescontainer}`}>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 bg-dark`}
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
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3`}
              >
                <i className="bi bi-file-earmark-check-fill text-light"></i>
              </div>
            </div>
          </div>
        </div>
        {/* 購物車內容 */}
        <div className="my-4 d-none d-md-block text-secondary">購物車內容</div>
        <div className="my-4 d-block d-md-none text-center text-secondary">
          預約行程
        </div>
        {/* 商品明細 */}
        <Order onTotalChange={handleTotalChange} />

        <p className="card-text d-flex justify-content-between align-items-center fs-5 px-3 fw-bold mb-5">
          合計: <span>NT$ {totalFromChild}</span>
        </p>

        {/* 確認訂單資訊 */}
        <div>
          <div
            className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center`}
          >
            預約資訊
          </div>
          {/* {reservationData.map((item) => ( */}
          <div className="item-details fs-5 px-3">
            <p className="card-text d-flex justify-content-between align-items-center mb-2">
              訂購日期: <span>{formattedDate}</span>
            </p>
            <p className="card-text d-flex justify-content-between align-items-center mb-2">
              入住日期: <span>{startDate}</span>
            </p>
            <p className="card-text d-flex justify-content-between align-items-center mb-2">
              退營日期: <span>{endDate}</span>
            </p>
          </div>
          <hr />
          <Link href="/ordercheckout">
            <button
              onClick={handleSubmit}
              className={`${styles.button} btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
            >
              前往結帳
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
