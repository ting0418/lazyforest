import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/components/member-center/member-order.module.scss'
import {
  FaRegCalendarDays,
  FaCircleChevronDown,
  FaCircleChevronUp,
  FaRegWindowMinimize,
} from 'react-icons/fa6'

function OrderItem(prop) {
  console.log({ compnent: 'OrderItem', order: prop.order })
  const [items, setItems] = useState([])
  const [viewItems, setViewItems] = useState(false)

  useEffect(() => {
    const loadOrderItems = async () => {
      console.log({ action: 'loadOrderItems' })
      try {
        const response = await fetch(
          `http://localhost:3005/order-record/my_order_items?order_id=${prop.order.order_id}`,
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }
        )

        const items = await response.json()
        console.log({ items })
        setItems(items)
      } catch (error) {
        console.log({ error })
      }
    }

    loadOrderItems()
  }, [])

  const convertStatus = (status) => {
    if (status === 0) {
      return '已完成'
    }
    if (status === 1) {
      return '處理中'
    }
    if (status === 2) {
      return '未付款'
    }
    if (status === 3) {
      return '代處理'
    }
  }

  return (
    <>
      <div className={styles.div_2}>
        <div className={styles.th}>
          <div className={styles.th_2}>訂單編號</div>
        </div>
        <div className={styles.th}>
          <div className={styles.th_2}>訂單日期</div>
        </div>
        <div className={styles.th_wrapper}>
          <div className={styles.th_2}>訂單狀態</div>
        </div>
        <div className={styles.th}>
          <div className={styles.th_2}>訂單總額</div>
        </div>
        <div className={styles.th}>
          <div className={styles.th_2}>{''}</div>
        </div>
      </div>
      <div className={styles.tr_th}>
        <div className={styles.th_3}>
          <div className={styles.th_4}>{prop.order.order_number}</div>
        </div>
        <div className={styles.th_3}>
          <div className={styles.th_4}>{prop.order.order_dt}</div>
        </div>
        <div className={styles.th_5}>
          <p className={styles.p}>
            <span className={styles.text_wrapper_7}>
              {convertStatus(prop.order.order_status)}
            </span>
            <span className={styles.text_wrapper_8}>&nbsp;</span>
          </p>
        </div>
        <div className={styles.th_3}>
          <div className={styles.th_4}>NT$ {prop.order.order_amount}</div>
        </div>
        <div className={styles.th_3}>
          <button
            className={styles.btn}
            onClick={() => {
              setViewItems(!viewItems)
            }}
          >
            <div className={styles.text_wrapper_9}>商品明細</div>
            <FaCircleChevronDown className={styles.circle_chevron_down} />
          </button>
        </div>
      </div>
      {viewItems &&
        items.map((item) => (
          <div key={item.id} className={styles.frame_2}>
            <div className={styles.div_2}>
              <div className={styles.th_6}>
                <div className={styles.th_2}>商品</div>
              </div>
              <div className={styles.th_7}>
                <div className={styles.th_8}>優惠</div>
              </div>
              <div className={styles.th_9}>
                <p className={styles.th_10}>
                  <span className={styles.text_wrapper_10}>單價</span>
                  <span className={styles.text_wrapper_8}>&nbsp;</span>
                </p>
              </div>
              <div className={styles.th_11}>
                <div className={styles.th_8}>數量</div>
              </div>
              <div className={styles.th_12}>
                <div className={styles.th_8}>小計</div>
              </div>
            </div>
            <div className={styles.orderlist_detail}>
              <div className={styles.th_13}>
                <Image
                  src={`/images/products/${item.product_img}.jpeg`}
                  alt="product"
                  width={113}
                  height={113}
                />
                <p className={styles.text_wrapper_11}>{item.product_name}</p>
              </div>
              <div className={styles.th_3}>
                <div className={styles.th_4}>夏日歡慶95折</div>
              </div>
              <div className={styles.th_5}>
                <div className={styles.flexcontainer}>
                  {/* <p className={styles.text}>
                <span className={styles.text_wrapper_12}>
                  NT$ 2,000
                  <br />
                </span>
              </p> */}
                  <p className={styles.text}>
                    <span className={styles.text_wrapper_13}>
                      NT$ {item.product_price}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.th_14}>
                <div className={styles.th_4}>{item.quantity}</div>
              </div>
              <div className={styles.th_15}>
                <div className={styles.th_16}>
                  NT$ {item.product_price * item.quantity}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default OrderItem
