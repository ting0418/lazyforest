import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/testcart.module.scss'
export default function CartIndex() {
  const [reservationData, setReservationData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderData, setOrderData] = useState([])
  const [ordercheckoutData, setOrdercheckoutData] = useState([])

  useEffect(() => {
    const reservationFromLocalStorage = JSON.parse(
      localStorage.getItem('reservationData')
    )
    const startDateFromLocalStorage = localStorage.getItem('startDate')
    const endDateFromLocalStorage = localStorage.getItem('endDate')
    const orderFromLocalStorage = JSON.parse(localStorage.getItem('orderData'))
    const ordercheckoutFromLocalStorage = JSON.parse(
      localStorage.getItem('ordercheckoutData')
    )

    if (reservationFromLocalStorage)
      setReservationData(reservationFromLocalStorage)
    if (startDateFromLocalStorage) setStartDate(startDateFromLocalStorage)
    if (endDateFromLocalStorage) setEndDate(endDateFromLocalStorage)
    if (orderFromLocalStorage) setOrderData(orderFromLocalStorage)
    if (ordercheckoutFromLocalStorage)
      setOrdercheckoutData(ordercheckoutFromLocalStorage)
  }, [])

  //定義變數
  const netTotal = orderData?.netTotal
  const orderDate = orderData?.orderDate
  const buyername = ordercheckoutData?.name
  const buyerphoneNumber = ordercheckoutData?.phoneNumber
  const buyeremail = ordercheckoutData?.email
  const buyermemo = ordercheckoutData?.memo
  const invoiceType = ordercheckoutData?.invoiceType
  const inputValue = ordercheckoutData?.inputValue
  const payMethod = ordercheckoutData?.payMethod
  const memo = ordercheckoutData?.memo

  const handleSubmit = () => {
    // 從localStorage中獲取數據
    const reservationData = JSON.parse(localStorage.getItem('reservationData'))
    const orderData = JSON.parse(localStorage.getItem('orderData'))
    const ordercheckoutData = JSON.parse(
      localStorage.getItem('ordercheckoutData')
    )

    const combinedData = {
      reservationData: reservationData,
      orderData: orderData,
      ordercheckoutData: ordercheckoutData,
    }

    fetch('http://localhost:3005/ordercheckout-end', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // 在这里处理后端的响应
        // console.log('Backend response:', responseData)
        console.log(responseData)
        // 判断responseData中是否有url属性，然后重定向
        if (responseData.url) {
          window.location.href = responseData.url
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <div className="container">
        <div className=" cart-area">
          <div className="row">
            <h1 className={`${styles.cindytitle}`}>CONFIRM | 預約確認</h1>
          </div>
          {/* 流程圖 */}
          <div className="mb-5">
            <div className={`${styles.circlescontainer}`}>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 `}
              >
                <i className="bi bi-cart text-light"></i>
              </div>
              <div className={`${styles.line}`}></div>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 bg-dark`}
              >
                <i className="bi bi-file-earmark-text text-light"></i>
              </div>
              <div className={`${styles.line}`}></div>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 `}
              >
                <i className="bi bi-file-earmark-check-fill text-light"></i>
              </div>
            </div>
          </div>
        </div>
        {/* 填寫送貨資訊 */}
        <div className="my-4 d-none d-md-block text-secondary">
          請確認訂單明細
        </div>
        <div className="my-4 d-block d-md-none text-center text-secondary">
          請確認訂單明細
        </div>
        {/* 商品資訊*/}
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className="d-none d-md-block border">
            <table className="table">
              <thead>
                <tr>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  ></th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    營地
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    營區
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    帳數
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    價格
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservationData?.map((item, index) => (
                  <tr key={index}>
                    <td className="bg-light text-center align-middle">
                      <img
                        className={`${styles.product}`}
                        src={item.zone_img}
                      />
                    </td>
                    <td className="bg-light text-center align-middle">
                      {item.camp_name}
                    </td>
                    <td className="bg-light text-center align-middle">
                      {item.zone_name}
                    </td>
                    <td className="bg-light text-center align-middle">
                      {item.quantity}
                    </td>
                    <td className="bg-light text-center align-middle">
                      NT ${item.zone_price}
                    </td>
                    <td className="bg-light text-center align-middle">
                      NT$ {item.quantity * item.zone_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mx-5">
              <p className="card-text d-flex justify-content-between align-items-center fs-5 mx-4 mb-2 fw-bold ">
                合計: <span>NT$ {netTotal}</span>
              </p>
            </div>
          </div>
          {/* 手機版顯示 d-block d-md-none */}
          <div className="d-block d-md-none border mb-3">
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center `}
            >
              商品明細
            </div>
            <div>
              <div>
                <table className="table">
                  <tbody>
                    {reservationData?.map((item, index) => (
                      <tr key={index}>
                        <td colSpan="7" className='bg-light'>
                          <div className="row mb-2">
                            <div className="col-5">
                              <img
                                className={styles.product}
                                src={item.zone_img}
                                alt={item.name}
                              />
                            </div>
                            <div className="col-7 mt-3">
                              {item.camp_name} / {item.zone_name}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-8">帳數: {item.quantity}</div>
                            <div className="col-4 ">
                              NT $ {`${item.quantity * item.zone_price}`}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <div className="d-flex justify-content-between mb-3 mx-4 fw-bold">
                    <div>合計:</div>
                    <div>NT$ {netTotal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 訂單明細 */}
        {/* 手機版顯示 d-block d-md-none */}
        <div className="border mb-3">
          <div
            className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
          >
            訂單明細
          </div>
          <div
            className={`bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
          >
            訂單資訊
          </div>
          <div className=" mx-1 fs-5">
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>訂購日期: </div>
              <div>{orderDate}</div>
            </div>
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>入住日期: </div>
              <div>{startDate}</div>
            </div>
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>退營日期: </div>
              <div>{endDate}</div>
            </div>
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>付款方式: </div>
              <div>{payMethod}</div>
            </div>
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>訂購人姓名: </div>
              <div>{buyername}</div>
            </div>
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>訂購人電話: </div>
              <div>{buyerphoneNumber}</div>
            </div>
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 my-2 mx-1 ${styles.mobilecheckoutend}`}
            >
              <div>訂單備註: </div>
              <div>{memo}</div>
            </div>
          </div>
        </div>

        {/* 回首頁 */}
        {/* <Link href="/"> */}
        <div>
          {payMethod === 'LINEPAY' ? (
            <div>
              <Image
                src="./LINE-Pay(h)_W119_n.png"
                className={`btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
                onClick={handleSubmit}
                width={120}
                height={45}
                alt="LINEPAY"
              />
            </div>
          ) : (
            <div>
              {payMethod === '現場付款' && (
                <button
                  onClick={handleSubmit}
                  className={`${styles.button} btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
                >
                  送出訂單
                </button>
              )}
            </div>
          )}
        </div>

        {/* </Link> */}
      </div>
    </>
  )
}
