import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import InvoiceOptions from '@/components/invoiceOptions'
import CityDistrictSelector from '@/components/citydistrict'
import styles from '@/styles/testcart.module.scss'
import { useRouter } from 'next/router'
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store'
import swal from 'sweetalert'
import moment from 'moment'
import { useUserContext } from '@/context/UserContext'
// import LoginForm from '@/components/popup/login'

// import Cookie from 'js-cookie'
export default function CartIndex() {
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 1 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  )

  // const handleShowLoginForm = () => {

  //     LoginForm()

  // }
  // 建立狀態變數
  const router = useRouter() // 初始化router
  const { user, setUser } = useUserContext()
  // const [isSubmitted, setIsSubmitted] = useState(false)
  // const [errors, setErrors] = useState({})
  //鄉鎮市區
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  //發票
  const [invoiceType, setInvoiceType] = useState('')
  const [inputValue, setInputValue] = useState('')

  //付款方式及運送方式
  const [payMethod, setPayMethod] = useState('')
  const [shippingMethod, setShippingMethod] = useState('')

  //訂購日
  // const [orderDate, setOrderDate] = useState('')

  // 訂購人資訊
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  })
  // 收件人資訊
  const [receiverInfo, setReceiverInfo] = useState({
    receiverName: '',
    receiverPhoneNumber: '',
    receiverEmail: '',
    receiverAddress: '',
  })
  //選縣市+區域
  const [buyerCity, setBuyerCity] = useState('')
  const [buyerDistrict, setBuyerDistrict] = useState('')
  const [receiverCity, setReceiverCity] = useState('')
  const [receiverDistrict, setReceiverDistrict] = useState('')
  // const [isInfoSame, setIsInfoSame] = useState(false)

  //打勾
  const [isSameInfo, setIsSameInfo] = useState(false)
  //網站服務條款及隱私權政策
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const handleCheckboxChange = () => {
    // setIsSubmitted(true)
    if (!isSameInfo) {
      // 將訂購人資訊複製到收件人資訊中
      setReceiverInfo({
        receiverName: buyerInfo.name,
        receiverPhoneNumber: buyerInfo.phoneNumber,
        receiverEmail: buyerInfo.email,
        receiverAddress: buyerInfo.address,
      })
      setReceiverCity(buyerCity)
      setReceiverDistrict(buyerDistrict)
    } else {
      // 清空收件人資訊
      setReceiverInfo({
        receiverName: '',
        receiverPhoneNumber: '',
        receiverEmail: '',
        receiverAddress: '',
      })
      setReceiverCity('')
      setReceiverDistrict('')
    }
    setIsSameInfo(!isSameInfo)
  }

  // SweetAlert
  const handleSubmit = () => {
    const isEmpty = (value) =>
      value === '' || value === null || value === undefined

    // 檢查每一個變數
    if (isEmpty(buyerInfo.name)) {
      swal('', '請填寫訂購人姓名', 'error')
      return
    }
    if (isEmpty(buyerInfo.phoneNumber)) {
      swal('', '請填寫訂購人電話', 'error')
      return
    }
    if (isEmpty(buyerInfo.email)) {
      swal('', '請填寫訂購人email', 'error')
      return
    }
    if (isEmpty(buyerInfo.address)) {
      swal('', '請填寫訂購人地址', 'error')
      return
    }
    if (isEmpty(receiverInfo.receiverName)) {
      swal('', '請填寫收件人姓名', 'error')
      return
    }
    if (isEmpty(receiverInfo.receiverPhoneNumber)) {
      swal('', '請填寫收件人電話', 'error')
      return
    }
    if (isEmpty(receiverInfo.receiverAddress)) {
      swal('', '請填寫收件人地址', 'error')
      return
    }
    if (isEmpty(invoiceType)) {
      swal('', '請選擇發票類型', 'error')
      return
    }
    if (isEmpty(inputValue)) {
      swal('', '請填寫發票資訊', 'error')
      return
    }
    if (isEmpty(payMethod)) {
      swal('', '請選擇付款方式', 'error')
      return
    }
    if (isEmpty(shippingMethod)) {
      swal('', '請選擇運送方式', 'error')
      return
    }
    if (!isTermsAccepted) {
      swal('', '請同意網站服務條款及隱私權政策', '')
      return
    }

    const currentDate = new Date() // 取得當下日期
    const formattedDate = currentDate.toISOString().split('T')[0] // 格式化日期为 'YYYY-MM-DD'

    const checkoutdata = {
      ...buyerInfo,
      ...receiverInfo,
      invoiceType: invoiceType,
      inputValue: inputValue,
      orderDate: formattedDate,
      payMethod: payMethod,
      shippingMethod: shippingMethod,
      buyerCity: buyerCity,
      buyerDistrict: buyerDistrict,
      receiverCity: receiverCity,
      receiverDistrict: receiverDistrict,
    }
    localStorage.setItem('checkoutdata', JSON.stringify(checkoutdata))
    // 進行頁面跳轉
    router.push('/checkout-end')
  }

  useEffect(() => {
    if (user) {
      const { name, phone, email, city, area, address } = user // 從 user 對象中解構需要的屬性
      setBuyerInfo((prevInfo) => ({
        ...prevInfo,
        name: name || prevInfo.name, // 如果有user.name就帶入
        phoneNumber: phone || prevInfo.phoneNumber,
        email: email || prevInfo.email,
        address: address || prevInfo.address,
      }))
      if (city) {
        setBuyerCity(city)
      }

      if (area) {
        setBuyerDistrict(area)
      }
    }
  }, [user])

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
          填寫訂購資訊
        </div>
        <div className="my-4 d-block d-md-none text-center text-secondary">
          填寫訂購資訊
        </div>
        {/* 顧客資訊*/}

        {/* 桌機版顯示 d-none d-md-block */}
        <div className=" border rounded mb-5">
          <div
            className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
          >
            訂購人資訊
            {user.phone ? null : (
              <p className="text-light ms-auto pe-2 mt-4 me-4 fs-6">
                <span className="text-primary ">快速註冊/登入</span> !
                以會員身分快速結帳
              </p>
            )}
          </div>
          <div>
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
            >
              訂購人資訊
              {user.phone ? null : (
                <p
                  className={`text-light mt-4 ms-auto me-2 ${styles.mobilelogin}`}
                >
                  <span className="text-primary ">快速註冊/登入</span> !
                  以會員身分快速結帳
                </p>
              )}
            </div>
            <div className="">
              <div className="row m-md-4 d-flex justify-content-md-around align-items-center">
                <div className="col-md-auto col-sm-12 text-center mt-1  ">
                  <input
                    type="text"
                    placeholder=" 訂購人姓名"
                    className={` ${styles.checkoutsize}`}
                    value={buyerInfo.name}
                    // value={user.name}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-auto col-sm-12 text-center mt-1">
                  <input
                    type="text"
                    placeholder=" 訂購人電話"
                    className={styles.checkoutsize}
                    value={buyerInfo.phoneNumber}
                    onChange={(e) =>
                      setBuyerInfo({
                        ...buyerInfo,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-auto col-sm-12 text-center mt-1">
                <input
                  type="text"
                  placeholder=" 訂購人email"
                  className={styles.checkoutsize2}
                  value={buyerInfo.email}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, email: e.target.value })
                  }
                />
              </div>
              <CityDistrictSelector
                selectedCity={buyerCity}
                setSelectedCity={setBuyerCity}
                selectedDistrict={buyerDistrict}
                setSelectedDistrict={setBuyerDistrict}
              />
              <div className="col-md-auto col-sm-12 text-center mt-2">
                <input
                  type="text"
                  placeholder=" 訂購人地址"
                  className={styles.checkoutsize2}
                  value={buyerInfo.address}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border mb-5">
          <div
            className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
          >
            收件人資訊
          </div>
          <div
            className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
          >
            收件人資訊
          </div>
          <div className="m-2">
            <div className="mb-3 ms-1">
              <input
                className="mb-2 ms-5 mt-3"
                type="checkbox"
                checked={isSameInfo}
                onChange={handleCheckboxChange}
              />
              &nbsp;同訂購人資訊
            </div>
          </div>
          <div className="">
            <div className="row mx-md-4 my-md-3 d-flex justify-content-md-around align-items-center">
              <div className="col-md-auto col-sm-12 text-center">
                <input
                  type="text"
                  placeholder=" 收件人姓名"
                  className={` ${styles.checkoutsize}`}
                  value={receiverInfo.receiverName}
                  onChange={(e) =>
                    setReceiverInfo({
                      ...receiverInfo,
                      receiverName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-auto col-sm-12 text-center">
                <input
                  type="text"
                  placeholder=" 收件人電話"
                  className={styles.checkoutsize}
                  value={receiverInfo.receiverPhoneNumber}
                  onChange={(e) =>
                    setReceiverInfo({
                      ...receiverInfo,
                      receiverPhoneNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <CityDistrictSelector
              selectedCity={receiverCity}
              setSelectedCity={setReceiverCity}
              selectedDistrict={receiverDistrict}
              setSelectedDistrict={setReceiverDistrict}
            />
            <div className="col-md-auto col-sm-12 text-center mt-2">
              <input
                type="text"
                placeholder=" 收件人地址"
                className={styles.checkoutsize2}
                value={receiverInfo.receiverAddress}
                onChange={(e) =>
                  setReceiverInfo({
                    ...receiverInfo,
                    receiverAddress: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="ms-2">
                <div className="mb-3 ms-1">
                  <input className="mb-2 ms-5 mt-1" type="checkbox" />
                  &nbsp;儲存為預設地址
                </div>
              </div> */}
          </div>
        </div>
        {/* 發票資訊 */}
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className=" border rounded mb-5">
            <div
              className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
            >
              發票資訊
            </div>
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
            >
              發票資訊
            </div>
            <InvoiceOptions
              invoiceType={invoiceType}
              setInvoiceType={setInvoiceType}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
        </div>
        {/* 付款方式與運送方式 */}
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className=" border rounded mb-5">
            <div
              className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
            >
              選擇付款與運送方式
            </div>
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
            >
              選擇付款與運送方式
            </div>
            <div className="row mx-4 d-flex justify-content-md-around align-items-center my-3">
              <div className="col-md-auto col-sm-12 text-center ">
                <select
                  className={` ${styles.citysize} my-3 mb-md-3`}
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                >
                  <option value="" disabled>
                    選擇付款方式
                  </option>
                  <option value="貨到付款">貨到付款</option>
                  <option value="LinePay">LinePay</option>
                </select>
              </div>
              <div className="col-md-auto col-sm-12 text-center">
                <select
                  className={`${styles.citysize} my-3 mb-md-3`}
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                >
                  <option value="" disabled>
                    選擇運送方式
                  </option>
                  <option value="宅配到府">宅配到府</option>
                  <option value="超商店取">超商店取</option>
                </select>
              </div>
              {/* 使用條件渲染來顯示/隱藏門市選擇部分 */}
              {shippingMethod === '超商店取' && (
                <>
                  {!store711.storeid ? (
                    <div className={`${styles.seven}`}>
                      <div className="d-flex align-items-center my-1">
                        <div className="me-2">
                          <img
                            src="./seven-eleven.png"
                            alt="Seven Eleven Logo"
                          />
                        </div>
                        <div>選擇門市</div>
                      </div>
                      <div className="text-center">
                        <button
                          className={`${styles.search} my-2 rounded`}
                          onClick={openWindow}
                        >
                          搜尋門市
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={`${styles.eleven}`}>
                      <div className="d-flex align-items-center my-1">
                        <div className="me-2">
                          <img
                            src="./seven-eleven.png"
                            alt="Seven Eleven Logo"
                          />
                        </div>
                        <div>選擇門市</div>
                      </div>
                      <div className="d-md-flex justify-content-between align-items-center my-2">
                        <div>已選擇門市店號:</div>
                        <div>
                          <input
                            type="text"
                            value={store711.storeid}
                            disabled
                            className={`${styles.addresslength}`}
                          />
                        </div>
                      </div>
                      <div className="d-md-flex justify-content-between align-items-center mb-2">
                        <div>已選擇門市名稱:</div>
                        <div>
                          <input
                            type="text"
                            value={store711.storename}
                            disabled
                            className={`${styles.addresslength}`}
                          />
                        </div>
                      </div>
                      <div className="d-md-flex justify-content-between align-items-center mb-2 ">
                        <div>門市地址:</div>
                        <div>
                          <input
                            type="text"
                            value={store711.storeaddress}
                            disabled
                            className={`${styles.addresslength}`}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          className={`${styles.search} my-2 rounded`}
                          onClick={openWindow}
                        >
                          更改門市
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* 下單前必看公告 */}
        <div className="bg-secondary mb-3">
          <h2 className="text-light ps-md-5 pt-md-4 mb-md-4 p-md-3 p-4">
            下單前必看公告
          </h2>
          <p className="text-light ps-md-5 py-md-1 px-md-3  px-3">
            1.如無法正常下單請聯繫客服 (可點擊右下角藍色圖示或私訊粉絲專頁客服)
          </p>
          <p className="text-light ps-md-5 p-md-3  px-3">
            2.購物金折抵上限為每筆訂單總金額之 10%，
            1000元可折抵100元購物金，2000元可折抵200元購物金，依此類推
          </p>
          <div className="d-flex me-md-2">
            <input
              className="ms-auto me-md-1"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={() => setIsTermsAccepted(!isTermsAccepted)}
            />
            <p className="text-light me-md-1 pt-md-3 ps-1 pe-3 pt-3">
              我同意網站<span className="text-primary">服務條款</span>及
              <span className="text-primary">隱私權政策</span>
            </p>
          </div>
        </div>
        {/* <Link href="/testcheckout-end"> */}
        <button
          onClick={handleSubmit}
          className={`${styles.button} btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
        >
          提交訂單
        </button>
        {/* </Link> */}
      </div>
    </>
  )
}
