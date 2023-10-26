import React, { useState, useEffect, useRef } from 'react'
import styles from './member-order.module.scss'
import Image from 'next/image'
import OrderItem from './order-item'
import ReactPaginate from 'react-paginate'

export default function OrderRecord() {
  console.log({ component: 'OrderRecord' })
  const [orders, setOrders] = useState([])
  const [ordersFilter, setOrdersFilter] = useState([])
  const [selectedOrder, setSelectedOrder] = useState({})
  const [orderOffset, setOrderOffset] = useState(0)
  const pageRootRef = useRef(null)

  useEffect(() => {
    const loadOrderList = async () => {
      console.log({ action: 'loadOrderList' })
      try {
        const response = await fetch(
          'http://localhost:3005/order-record/my_orders',
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }
        )

        const data = await response.json()
        console.log({ data })
        setOrders(data)
        setOrdersFilter(data.slice(0, 3))
      } catch (error) {
        console.log({ error })
      }
    }

    loadOrderList()
  }, [])

  // 點選分頁
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % orders.length
    setOrderOffset(newOffset)
  }
  useEffect(() => {
    if (pageRootRef.current) {
      // 滾動到根元素的頂部
      pageRootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOrdersFilter(orders.slice(0 + orderOffset, 3 + orderOffset))
  }, [orderOffset])

  return (
    <>
      <div
        className={`d-flex justify-contnet-center align-items-center ${styles.screen}`}
        ref={pageRootRef}
      >
        <div
          className={`d-flex justify-contnet-center align-items-center ${styles.all_wrapper}`}
        >
          <div className={styles.all}>
            <div className={styles.div_wrapper}>
              <p className={styles.order_record}>
                <span className={styles.text_wrapper}>ORDER RECORD</span>
                <span className={styles.span}>｜</span>
                <span className={styles.text_wrapper_2}>訂單記錄</span>
              </p>
            </div>
            {/* <div className={styles.search_bar}>
              <div className={styles.date_search}>
                <div className={styles.date_select}>
                  <div className={styles.text_wrapper_3}>日期區間查詢</div>
                  <div className={styles.frame}>
                    <div className={styles.input}>
                      <input className={styles.text_input} />
                      <FaRegCalendarDays className={styles.icon} />
                    </div>
                    <FaRegWindowMinimize />
                    <div className={styles.input}>
                      <input className={styles.text_input} />
                      <FaRegCalendarDays className={styles.icon} />
                    </div>
                  </div>
                </div>
                <div className={styles.btn_search}>
                  <div className={styles.div}>查詢</div>
                </div>
              </div>
              <div className={styles.btn_all_order}>
                <div className={styles.text_btn}>所有訂單</div>
                <FaCircleChevronDown className={styles.icon} />
              </div>
            </div>

            <div className={styles.div_wrapper}>
              <div className={styles.text_wrapper_6}>
                您的查詢區間為2023/08/01至2023/09/01，結果如下
              </div>
            </div> */}

            {ordersFilter &&
              ordersFilter.map((order) => (
                <div key={order.order_id} className={styles.oreder_list_close}>
                  <OrderItem order={order} />
                </div>
              ))}
            {/* 分頁 */}
            <div
              className={`mt-5 d-flex justify-content-center ${styles.paginate}`}
              style={{ width: '100%' }}
            >
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(orders.length / 3)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                // page-item
                pageClassName="pageBtn"
                previousClassName="pageBtn goBtn"
                nextClassName="pageBtn goBtn"
                breakClassName="pageBtn"
                //active
                activeClassName="pageActive"
                //container
                containerClassName="pageContainer"
                //link
                pageLinkClassName="pageLink"
                previousLinkClassName="pageLink goLink"
                nextLinkClassName="pageLink goLink"
                breakLinkClassName="pageLink"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
