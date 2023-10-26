import { useEffect, useState, useRef } from 'react'
import OrderRecord from '@/components/member-center/order-record'
import ReactPaginate from 'react-paginate'

export default function Record() {
  const pageRootRef = useRef(null)
  const [orders, setOrders] = useState([])

  //分頁
  //每頁資料顯示數量
  // const ordersPerPage = 3

  const [orderOffset, setOrderOffset] = useState(0)

  // const endOffset = orderOffset + ordersPerPage

  // const currentorders = orders.slice(orderOffset, endOffset)
  // const pageCount = Math.ceil(orders.length / ordersPerPage)

  // 點選分頁
  const handlePageClick = (event) => {
    const newOffset = (event.selected * ordersPerPage) % orders.length
    setOrderOffset(newOffset)
  }
  useEffect(() => {
    if (pageRootRef.current) {
      // back to the top
      pageRootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [orderOffset])
  return (
    <>
      <div className="container">
        <OrderRecord />
        {/* 分頁 */}
        {/* <div className="mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            // pageCount={pageCount}
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
        </div> */}
      </div>
    </>
  )
}
