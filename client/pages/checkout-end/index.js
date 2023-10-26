import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/testcart.module.scss'
export default function CartIndex() {
  const [cart, setCart] = useState(null)
  const [cartData, setCartData] = useState(null)
  const [checkoutData, setCheckoutData] = useState(null)
  const [store711, setStore711] = useState(null)

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
    const cartDataFromLocalStorage = JSON.parse(
      localStorage.getItem('cartdata')
    )
    const checkoutDataFromLocalStorage = JSON.parse(
      localStorage.getItem('checkoutdata')
    )
    const store711FromLocalStorage = JSON.parse(
      localStorage.getItem('store711')
    )

    if (cartFromLocalStorage) setCart(cartFromLocalStorage)
    if (cartDataFromLocalStorage) setCartData(cartDataFromLocalStorage)
    if (checkoutDataFromLocalStorage)
      setCheckoutData(checkoutDataFromLocalStorage)
    if (store711FromLocalStorage) setStore711(store711FromLocalStorage)
  }, [])

  // const cart = JSON.parse(localStorage.getItem('cart'))
  // const cartData = JSON.parse(localStorage.getItem('cartdata'))
  // const checkoutData = JSON.parse(localStorage.getItem('checkoutdata'))

  //定義變數
  const netTotal = cartData?.netTotal
  const shoppingGold = cartData?.shoppingGold
  const buyername = checkoutData?.name
  const buyerphoneNumber = checkoutData?.phoneNumber
  const buyeremail = checkoutData?.email
  const buyeraddress =
    checkoutData?.buyerCity +
    checkoutData?.buyerDistrict +
    checkoutData?.address
  const receivername = checkoutData?.receiverName
  const receiverphoneNumber = checkoutData?.receiverPhoneNumber
  const receiveremail = checkoutData?.receiverEmail
  const receiveraddress =
    checkoutData?.receiverCity +
    checkoutData?.receiverDistrict +
    checkoutData?.receiverAddress
  const invoiceType = checkoutData?.invoiceType
  const inputValue = checkoutData?.inputValue
  const orderDate = checkoutData?.orderDate
  const payMethod = checkoutData?.payMethod
  const shippingMethod = checkoutData?.shippingMethod
  const storeid = store711?.storeid
  const storename = store711?.storename
  const storeaddress = store711?.storeaddress
  // const checkoutdata = {
  //   ...buyerInfo,
  //   ...receiverInfo,
  //   invoiceType: invoiceType,
  //   inputValue: inputValue,
  //   orderDate: formattedDate,
  //   // cart: cartData,
  // }

  const handleSubmit = () => {
    // 從localStorage中獲取數據
    const cartData = JSON.parse(localStorage.getItem('cart'))
    const amountData = JSON.parse(localStorage.getItem('cartdata'))
    const checkoutData = JSON.parse(localStorage.getItem('checkoutdata'))

    const combinedData = {
      cart: cartData,
      amount: amountData,
      checkout: checkoutData,
    }

    fetch('http://localhost:3005/checkout-end', {
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
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 bg-dark`}
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
        {/* 填寫送貨資訊 */}
        <div className="my-4 d-none d-md-block text-secondary">
          {/* 訂單編號 LF20231027000392 */}
          請確認商品及訂單明細
        </div>
        <div className="my-4 d-block d-md-none text-center text-secondary">
          請確認商品及訂單明細
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
                  >
                    商品
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    名稱
                  </th>
                  {/* <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    優惠
                  </th> */}
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    單價
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    數量
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr key={index}>
                    <td className="bg-light text-center align-middle">
                      <img
                        className={` ${styles.product}`}
                        src={item.img}
                        alt={item.name}
                      />
                    </td>
                    <td className="bg-light text-center align-middle">
                      {item.name}
                    </td>
                    {/* <td className="text-center align-middle">夏日歡慶95折</td> */}
                    <td className="bg-light text-center align-middle">
                      NT ${item.price}
                    </td>
                    <td className="bg-light text-center align-middle">
                      {item.quantity} 件
                    </td>
                    <td className="bg-light text-center align-middle">
                      {' '}
                      NT$ {item.itemTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=" mx-1 fs-5">
              <div className="d-flex justify-content-between px-5 my-2">
                <div>運費:</div>
                <div>已達免運門檻</div>
              </div>
              <div className="d-flex justify-content-between px-5 my-2">
                <div>合計:</div>
                <div>NT$ {netTotal}</div>
              </div>
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
                    {cart?.map((item, index) => (
                      <tr key={index}>
                        <td className="bg-light" colSpan="7">
                          <div className="row mb-2">
                            <div className="col-5">
                              <img
                                className={styles.product}
                                src={item.img}
                                alt={item.name}
                              />
                            </div>
                            <div className="col-7 mt-3">{item.name}</div>
                          </div>
                          {/* <div className="row mb-2">
                            <div className="col-8">夏日歡慶95折</div>
                            <div className="col-4">NT ${item.price}</div>
                          </div> */}
                          <div className=" d-flex justify-content-between mx-4">
                            <div className="">{item.quantity} 件</div>
                            <div className="">NT ${item.itemTotal}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <div className="d-flex justify-content-between p-2 ">
                    <div>運費:</div>
                    <div>已達免運門檻</div>
                  </div>
                  <div className="d-flex justify-content-between p-2">
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
            訂單明細
          </div>
          <div className=" mx-1 fs-5">
            <div
              className={`d-flex justify-content-between mt-md-4 mb-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>訂購日期: </div>
              <div>{orderDate}</div>
            </div>
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>付款方式: </div>
              <div>{payMethod}</div>
            </div>
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>送貨方式: </div>
              <div>{shippingMethod}</div>
            </div>
            {store711 && (
              <>
                <div
                  className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
                >
                  <div>超商門市:</div>
                  <div>{store711.storename}</div>
                </div>
                <div
                  className={`d-flex justify-content-between my-md-3 px-md-5 `}
                >
                  <div className={`text-nowrap ${styles.mobilecheckoutend}`}>
                    門市地址:
                  </div>
                  <div className={`${styles.mobileaddress} ms-4`}>
                    {store711.storeaddress}
                  </div>
                </div>
                {/* <div
                  className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
                >
                  <div className={`text-nowrap ${styles.mobilecheckoutend}`}>
                    訂購人地址:
                  </div>
                  <div className={`${styles.mobileaddress} ms-3`}>
                    {store711.storeaddress}
                  </div>
                </div> */}
              </>
            )}
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>訂購人姓名: </div>
              <div>{buyername}</div>
            </div>
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>訂購人電話: </div>
              <div>{buyerphoneNumber}</div>
            </div>
            {/* <hr /> */}
            <div className={`d-flex justify-content-between my-md-3 px-md-5 `}>
              <div className={`text-nowrap ${styles.mobilecheckoutend}`}>
                訂購人地址:
              </div>
              <div className={`${styles.mobileaddress} ms-4`}>
                {buyeraddress}
              </div>
            </div>
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>收件人姓名: </div>
              <div>{receivername}</div>
            </div>
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between my-md-3 px-md-5 ${styles.mobilecheckoutend}`}
            >
              <div>收件人電話: </div>
              <div>{receiverphoneNumber}</div>
            </div>
            {/* <hr /> */}
            <div
              className={`d-flex justify-content-between mt-md-3 mb-md-4 px-md-5`}
            >
              <div className={`text-nowrap ${styles.mobilecheckoutend}`}>
                收件人地址:
              </div>
              <div className={`${styles.mobileaddress} ms-4`}>
                {receiveraddress}
              </div>
            </div>
          </div>
        </div>

        {/* 回首頁 */}
        <div>
          {payMethod === 'LinePay' ? (
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
              {payMethod === '貨到付款' && (
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
      </div>
    </>
  )
}
