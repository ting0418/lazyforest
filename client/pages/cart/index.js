import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/testcart.module.scss'
import List from '@/components/cart/list'
import { useCart } from '@/hooks/use-cart'
export default function CartIndex() {
  // 建立狀態變數

  //EDDY
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne,
  } = useCart()
  //
  // 範例資料
  // type: 'amount'相減，'percent'折扣
  // const coupons = [
  //   { id: 1, name: '折100元', value: 100, type: 'amount' },
  //   { id: 2, name: '折300元', value: 300, type: 'amount' },
  //   { id: 2, name: '折550元', value: 300, type: 'amount' },
  //   { id: 3, name: '8折券', value: 0.2, type: 'percent' },
  // ]
  const [couponOptions, setCouponOptions] = useState([])
  const [selectedCouponId, setSelectedCouponId] = useState(0)
  const [netTotal, setNetTotal] = useState(0)
  // const [deliveryMethod, setDeliveryMethod] = useState('')
  // const [payMethod, setPayMethod] = useState('')
  // const [shoppingGold, setShoppingGold] = useState(0)
  useEffect(() => {
    // Fetch coupons data from the server
    fetch('http://localhost:3005/cart')
      .then((response) => response.json())
      .then((data) => {
        setCouponOptions(data)
      })
      .catch((error) => {
        console.error('Error fetching coupons:', error)
      })
  }, []) // 注意空的依賴數組，這確保了這個 effect 只在元件掛載時運行一次

  const [eddie, setEddie] = useState(0)
  const [eddie2, setEddie2] = useState(0)
  useEffect(() => {
    // 一開始沒套用折價券，netTotal和cart.cartTotal一樣
    if (!selectedCouponId) {
      setNetTotal(cart.cartTotal)
      setEddie(cart.cartTotal)
      setEddie2(Math.round(cart.cartTotal * 0.01))
      return
    }

    const coupon = couponOptions.find((v) => v.id === selectedCouponId)

    // type: 'amount'相減，'percent'折扣
    const newNetTotal =
      coupon.type === 'amount'
        ? cart.cartTotal - coupon.value
        : Math.round(cart.cartTotal * (1 - coupon.value))

    setNetTotal(newNetTotal)
  }, [cart.cartTotal, selectedCouponId])
  //
  const handleSubmit = () => {
    const shoppingGold = cart.cartTotal * 0.01

    const cartdata = {
      netTotal: netTotal,
      selectedCouponId: selectedCouponId,
      shoppingGold: shoppingGold,
      // item: parsedItem,
    }

    localStorage.setItem('cartdata', JSON.stringify(cartdata))
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
          購物車內容
        </div>
        {/* 商品明細 */}
        <List />
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className="d-none d-md-block">
            <div className="d-flex mb-1">
              <div className="bg-primary py-2 px-4">優惠促銷</div>
              <div className="bg-secondary text-light py-2 px-4">
                全站消費滿NT$ 1,000 元， 免運費
              </div>
            </div>
            <div className="d-flex mb-1">
              <div className="bg-primary py-2 px-3">購物金回饋</div>
              <div className="bg-secondary text-light py-2 px-3">
                消費滿額回饋 1% 購物金，可於下次消費使用
              </div>
              <div className="py-2 px-3">+NT$ {eddie2} 購物金</div>

              <div className="ms-auto">NT$ {eddie}</div>
            </div>
          </div>
          {/* 手機版顯示 d-block d-md-none */}
          <div className="d-block d-md-none">
            <div>
              <div>
                <div className={`${styles.mobilecartfs} mb-2`}>
                  <div className={`bg-primary ${styles.mobilead}`}>
                    優惠促銷
                  </div>
                  <div>全站消費滿NT$ 1,000 元， 免運費</div>
                  <div className={`bg-primary ${styles.mobilead}`}>
                    購物金回饋
                  </div>
                  <div className="d-flex">
                    <div>消費滿額回饋10%購物金，可於下次消費使用</div>
                    <div className="ms-auto">+NT$ {eddie2}購物金</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 確認訂單資訊 */}
        <div>
          {/* <hr /> */}
          <div className="my-3 text-secondary d-none d-md-block">
            確認訂單資訊
          </div>
          <div
            className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center `}
          >
            訂單資訊
          </div>
          <p className="card-text d-flex justify-content-between align-items-center mb-2">
            小計: <span>NT$ {eddie}</span>
          </p>
          <p className="card-text d-flex justify-content-between align-items-center mb-2">
            運費: <span>免運費</span>
          </p>
          <div className="d-flex justify-content-between">
            <div className="mt-1">折價券: </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={selectedCouponId}
                onChange={(e) => {
                  setSelectedCouponId(Number(e.target.value))
                }}
              >
                <option value="0">選擇折價券</option>
                {couponOptions.map((v) => {
                  return (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  )
                })}
              </select>
              {/* <p>最後折價金額: {netTotal}</p> */}
            </div>
          </div>
          <hr />
          <p className="card-text d-flex justify-content-between align-items-center">
            {/* 優惠: <span></span> */}
          </p>
          <p className="card-text d-flex justify-content-between align-items-center">
            合計: <span>NT$ {netTotal}</span>
          </p>
          <hr />
          <Link href="/checkout">
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
