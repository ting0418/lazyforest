import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'
import styles from '@/styles/testcart.module.scss'

export default function List() {
  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem } = useCart()

  // 修正 Next hydration 錯誤
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }
  // fix end

  return (
    <>
      <div className="d-none d-md-block">
        <table
          className="table border"
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
                商品
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                名稱
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                單價
              </th>
              <th
                className={`bg-dark text-light text-center ${styles.testcarttitle}`}
              >
                數量
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
            {items.map((v, i) => {
              return (
                <tr key={v.id}>
                  <td className="text-center bg-light">
                    <img className={styles.product} src={v.img} />
                  </td>
                  <td className="text-center align-middle bg-light">
                    {v.name}{' '}
                  </td>
                  <td className="text-center align-middle bg-light">
                    {v.price}
                  </td>
                  <td className="text-center align-middle bg-light">
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
                  <td className="text-center align-middle bg-light">
                    {v.itemTotal}
                  </td>
                  <td className="text-center align-middle bg-light">
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
          {cart.isEmpty && '尚未選購任何商品'}
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
            商品明細
          </thead>
          <tbody>
            {items.map((v, i) => (
              <tr key={v.id}>
                <td colSpan="7" className='bg-light'>
                  <div className="row mb-2">
                    <div className="col-5">
                      <img className={styles.product} src={v.img} />
                    </div>
                    <div className="col-7 mt-3 ">{v.name}</div>
                  </div>
                  <div className="row">
                    <div className="col-8 ">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn "
                          onClick={() => {
                            minusOne(v.id)
                          }}
                        >
                          -
                        </button>
                        <button type="button" className="btn">
                          {v.quantity}
                        </button>
                        <button
                          type="button"
                          className="btn "
                          onClick={() => {
                            plusOne(v.id)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-4 mt-2 ">NT ${v.itemTotal}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {/* <br /> */}
          {cart.isEmpty && '購物車為空'}
          {/* <hr /> */}
        </div>
      </div>
    </>
  )
}
