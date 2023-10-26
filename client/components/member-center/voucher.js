import React, { useState, useEffect, useRef } from 'react'
import styles from './member-voucher.module.scss'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'

export default function Voucher() {
  const [vouchers, setVouchers] = useState([])
  const [vouchersFilter, setVouchersFilter] = useState([])
  const [voucherOffset, setVoucherOffset] = useState(0)
  const [voucherCount, setVoucherCount] = useState(0)
  const [get, setGet]=useState(false)

  const pageRootRef = useRef(null)

  useEffect(() => {
    const loadVoucherList = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/coupon', {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        })

        const data = await response.json()
        console.log('loadVoucherList()', data)
        const count = data.length
        setVoucherCount(count)
        setVouchers(data)
        setVouchersFilter(data.slice(0, 4))
      } catch (error) {
        console.log({ error })
      }
    }

    loadVoucherList()
  }, [])

  // 點選分頁
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % vouchers.length
    setVoucherOffset(newOffset)
  }
  useEffect(() => {
    if (pageRootRef.current) {
      // 滾動到根元素的頂部
      pageRootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setVouchersFilter(vouchers.slice(0 + voucherOffset, 4 + voucherOffset))
  }, [voucherOffset])

  const swalgetsuc = () => {
    Swal.fire({
      timer: 2000,
      title: `領取成功`,
      text: '結帳時可以使用！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  return (
    <>
      <div className={styles.screen} ref={pageRootRef}>
        <div className={styles.member_vouchers_wrapper}>
          <div className={styles.member_vouchers}>
            <div className={styles.my_voucher_title}>
              <p className={styles.voucher}>
                <span className={styles.text_wrapper}>VOUCHER</span>
                <span className={styles.span}>｜</span>
                <span className={styles.text_wrapper_2}>優惠卷</span>
              </p>
            </div>
            <div className={styles.my_vouchers}>
              <div className={styles.voucher_detail}>
                <div className={styles.th}>
                  <div className={styles.div}>優惠卷</div>
                  <div className={styles.text_wrapper_3}>{voucherCount} </div>
                </div>
                <div className={styles.th_2}>
                  <div className={styles.div}>最高優惠</div>
                  <div className={styles.text_wrapper_3}>75%OFF</div>
                </div>
                <div className={styles.th_2}>
                  <div className={styles.div}>已累積省下</div>
                  <div className={styles.text_wrapper_3}>NT$ 1,000</div>
                </div>
                <div className={styles.frame_wrapper}>
                  <button className={styles.frame}>
                    <div
                      className={styles.text_wrapper_4}
                      onClick={() => {
                        swalgetsuc()
                        setGet(true)
                      }}
                    >
                      一鍵領取
                    </div>
                  </button>
                </div>
              </div>

              <div className={styles.vouchersContainer}>
                {vouchersFilter &&
                  vouchersFilter.map((voucher) => (
                    <div className={styles.vouchers} key={voucher.id}>
                      <div className={styles.vouches_staright}>
                        <div className={styles.coupon}>
                          <div className={styles.frame_2}>
                            <div className={styles.frame_3}>
                              <div className={styles.text_wrapper_5}>
                                {voucher.end_dt}
                              </div>
                              <div className={styles.text_wrapper_6}>
                                低消NT$ 1,000
                              </div>
                            </div>
                            <div className={styles.frame_4}>
                              <div className={styles.text_wrapper_7}>
                                優惠代碼
                              </div>
                              <div className={styles.group}>
                                <div className={styles.overlap_group}>
                                  <div className={styles.rectangle_wrapper}>
                                    <div className={styles.rectangle}>
                                      <div
                                        className={styles.text_wrapper_8}
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <span style={{ flex: '1' }}>
                                          {voucher.code}
                                        </span>
                                        {/* <div className={styles.btn_wrapper2}> */}
                                        <button className={styles.btn_wrapper}>
                                          <div className={styles.btn_text}>
                                            {get? '已領取':'領取'}
                                            
                                          </div>
                                        </button>
                                        {/* </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.frame_6}>
                            <div className={styles.text_wrapper_8}>
                              夏日歡慶
                            </div>
                            <div className={styles.text_wrapper_10}>
                              {voucher.name}
                            </div>
                          </div>
                          <div className={styles.line_wrapper}>
                            <Image
                              src="/member-center/dash_line.png"
                              alt="line"
                              width={2}
                              height={165}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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
                  pageCount={Math.ceil(vouchers.length / 4)}
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
      </div>
    </>
  )
}
