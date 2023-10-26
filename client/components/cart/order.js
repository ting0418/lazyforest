import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'
import styles from '@/styles/testcart.module.scss'

export default function List({ onTotalChange }) {
  const [items, setItems] = useState([])
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [hydrated, setHydrated] = useState(false)
  // 整合 useEffect
  useEffect(() => {
    // 解析預訂數據
    const reservation = localStorage.getItem('reservationData')
    const parsedItem = reservation ? JSON.parse(reservation) : []
    setItems(parsedItem)

    // 構建訂單和計算總計，這部分現在依賴於 parsedItem
    const orderData = parsedItem.map((data, index) => {
      // 原本建立 orderData 的代碼...
      const camp = data.camp_name
      const campzone = data.zone_name
      const price = data.zone_price
      const quantity = data.quantity
      const orderTotal = price * quantity
      return {
        id: index,
        camp,
        campzone,
        price,
        quantity,
        orderTotal,
      }
    })
    setOrder(orderData)
    setTotal(orderData.reduce((acc, curr) => acc + curr.orderTotal, 0))

    // 標記為 hydrated
    setHydrated(true)
  }, [])

  // 當 items 變動時，更新 order 和 total
  useEffect(() => {
    // 使用 'items' 來創建 'orderData' 的邏輯...
    const orderData = items.map((data, index) => {
      // 原本建立 orderData 的代碼...
      const camp = data.camp_name
      const campimg = data.camp_img
      const campzone = data.zone_name
      const zoneimg = data.zone_img
      const price = data.zone_price
      const quantity = data.quantity
      const orderTotal = price * quantity
      return {
        id: index,
        camp,
        campimg,
        campzone,
        zoneimg,
        price,
        quantity,
        orderTotal,
      }
    })
    setOrder(orderData)
    // 使用 reduce 函數來計算總計
    const orderTotal = orderData.reduce((acc, curr) => acc + curr.orderTotal, 0)
    setTotal(orderTotal)
  }, [items]) // 依賴於 'items' 確保當 'items' 更改時運行

  useEffect(() => {
    onTotalChange(total)
  }, [total])
  // 若不想在第一次渲染時看到閃爍，可用一個 loader 替代 null。
  if (!hydrated) {
    return <div>Loading...</div>
  }

  function removeItem(itemId) {
    // 移除指定的項目
    const updatedItems = items.filter((_, index) => index !== itemId)

    // 儲存回 localStorage
    localStorage.setItem('reservationData', JSON.stringify(updatedItems))

    // 更新畫面上的項目
    setItems(updatedItems)
  }
  function plusOne(itemId) {
    const updatedItems = [...items] // 複製原始陣列

    if (updatedItems[itemId] && updatedItems[itemId]) {
      updatedItems[itemId].quantity += 1 // 增加數量
    }

    // 更新 localStorage 和狀態
    localStorage.setItem('reservationData', JSON.stringify(updatedItems))
    setItems(updatedItems)
  }

  function minusOne(itemId) {
    const updatedItems = [...items] // 複製原始陣列

    if (
      updatedItems[itemId] &&
      updatedItems[itemId] &&
      updatedItems[itemId].quantity > 1
    ) {
      updatedItems[itemId].quantity -= 1 // 減少數量，但不低於1
    }

    // 更新 localStorage 和狀態
    localStorage.setItem('reservationData', JSON.stringify(updatedItems))
    setItems(updatedItems)
  }
  // 整理解析後的資料

  // 使用hooks 解出所需的狀態與函式(自context)
  // const { cart, items, plusOne, minusOne, removeItem } = useCart()

  // 修正 Next hydration 錯誤
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  // const [hydrated, setHydrated] = useState(false)

  // useEffect(() => {
  //   setHydrated(true)
  // }, [])

  // if (!hydrated) {
  //   // Returns null on first render, so the client and server match
  //   return null
  // }
  // // fix end

  return (
    <>
      <div className="d-none d-md-block">
        <table
          className="table"
          cellPadding="0"
          border="0"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                營地
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                營區
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                價格
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                帳數
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                小計
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                移除
              </th>
            </tr>
          </thead>
          <tbody>
            {order.map((v, i) => {
              return (
                <tr key={v.id} >
                  <td className=" bg-light text-center align-middle">{v.camp} </td>
                  <td className=" bg-light text-center align-middle">{v.campzone} </td>
                  <td className=" bg-light text-center align-middle">{v.price}</td>
                  <td className=" bg-light text-center align-middle">
                    <div className="btn-group mr-2" role="group">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                          minusOne(v.id)
                        }}
                      >
                        -
                      </button>
                      <button type="button" className="btn btn-light">
                        {v.quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                          plusOne(v.id)
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="bg-light text-center align-middle">{v.orderTotal}</td>
                  <td className=" bg-light text-center align-middle">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        removeItem(v.id)
                      }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          {/* items: {cart.totalItems} / total: {cart.cartTotal} */}
          <br />
          {/* {cart.isEmpty && '尚未選購任何商品'} */}
          {/* <hr /> */}
        </div>
      </div>
      {/* 手機版 */}
      <div className="d-block d-md-none">
        <table
          className="table"
          cellPadding="0"
          border="0"
          width="100%"
          cellSpacing="0"
        >
          <thead
            className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center `}
          >
            營地明細
          </thead>
          <tbody>
            {order.map((v, i) => (
              <tr key={v.id}>
                <td colSpan="7" className='bg-light'>
                  <div className="row mb-2">
                    <div className="col-5">
                      <img className={styles.product} src={v.zoneimg} />
                    </div>
                    <div className="col-7 mt-3">
                      {v.camp} / {v.campzone}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8 ps-1">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            minusOne(v.id)
                          }}
                        >
                          -
                        </button>
                        <button type="button" className="btn btn-light">
                          {v.quantity}
                        </button>
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            plusOne(v.id)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-4 mt-2">NT ${v.orderTotal}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {/* items: {cart.totalItems} / total: {cart.cartTotal} */}
          <br />
          {order.isEmpty && '購物車為空'}
          {/* <hr /> */}
        </div>
      </div>
    </>
  )
}
