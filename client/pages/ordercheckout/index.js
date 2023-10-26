import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import InvoiceOptions2 from '@/components/invoiceOptions2'
import styles from '@/styles/testcart.module.scss'
import { useUserContext } from '@/context/UserContext'
import swal from 'sweetalert'
export default function CartIndex() {
  // 建立狀態變數
  const router = useRouter() // 初始化router
  const { user, setUser } = useUserContext()
  useEffect(() => {
    if (user) {
      const { name, phone, email, city, district, address } = user // 從 user 對象中解構需要的屬性
      setBuyerInfo((prevInfo) => ({
        ...prevInfo,
        name: name || prevInfo.name, // 如果有user.name就帶入
        phoneNumber: phone || prevInfo.phoneNumber,
        email: email || prevInfo.email,
      }))
    }
  }, [user])
  //發票
  const [invoiceType, setInvoiceType] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [payMethod, setPayMethod] = useState('')

  // 訂購人資訊
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    memo: '',
  })

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
    const ordercheckoutData = {
      ...buyerInfo,
      invoiceType: invoiceType,
      inputValue: inputValue,
      payMethod: payMethod,
    }
    localStorage.setItem('ordercheckoutData', JSON.stringify(ordercheckoutData))
    // 進行頁面跳轉
    router.push('/ordercheckout-end')
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
            </div>
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
            <InvoiceOptions2
              invoiceType={invoiceType}
              setInvoiceType={setInvoiceType}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
        </div>
        {/* 付款方式 */}
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className=" border rounded mb-5">
            <div
              className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
            >
              付款方式
            </div>
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
            >
              付款方式
            </div>
            <div className="mt-md-4 ms-md-5 ps-md-2 mb-md-3 pt-md-3 ms-5  mt-4 mb-2">
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
                className={` ${styles.checkoutsize2}`}
              >
                <option value="">請選擇付款方式</option>
                <option value="現場付款">現場付款</option>
                <option value="LINEPAY">LINEPAY</option>
              </select>
            </div>
          </div>
        </div>
        {/* 訂單備註 */}
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className=" border rounded mb-4">
            <div
              className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
            >
              訂單備註
            </div>
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
            >
              訂單備註
            </div>
            <div className="d-flex justify-content-center align-items-center p-md-4 px-3 pb-3">
              <textarea
                rows="5"
                cols="143"
                placeholder=" 有甚麼想告訴營主的嗎?"
                value={buyerInfo.memo}
                onChange={(e) =>
                  setBuyerInfo({ ...buyerInfo, memo: e.target.value })
                }
              ></textarea>
            </div>
          </div>
        </div>
        {/* <Link href="/ordercheckout-end"> */}
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
