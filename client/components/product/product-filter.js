import React, { useState, useEffect } from 'react'
import styles from '@/components/product/product-filter.module.scss'

export default function ProductFilter({
  keyword,
  setKeyword,
  catIds,
  setCatIds,
  discount,
  setDiscount,
  budget,
  orderby,
  setOrderby,
  setBudget,
  newArrival,
  setNewArrival,
  setLoading,
  getProductsQs,
  router,
  setproductOffset,
}) {
  const [maxPrice, setMaxPrice] = useState(15000)
  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false)
  const [openSorting, setOpenSorting] = useState(false)
  const [selectNew, setSelectNew] = useState(false)
  const [selectDis, setSelectDis] = useState(false)
  const [sortAsc, setSortAsc] = useState(false)
  const [sortDesc, setSortDesc] = useState(false)

  const toggleSelectNew = () => {
    setSelectNew(!selectNew)
  }
  const toggleSelectDis = () => {
    setSelectDis(!selectDis)
  }
  const toggleSortAsc = () => {
    setSortAsc(!sortAsc)
    setSortDesc(false)
  }
  const toggleSortDesc = () => {
    setSortDesc(!sortDesc)
    setSortAsc(false)
  }

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value))
  }

  const toggleOpenAdvancedSearch = () => {
    setOpenAdvancedSearch(!openAdvancedSearch)
    // 當進階搜尋打開時，同時關閉排序菜單
    if (openSorting) {
      setOpenSorting(false)
    }
  }

  // 添加點擊事件監聽器，只在相應的菜單打開時觸發
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // 檢查是否點擊事件發生在進階搜尋菜單之外
      if (openAdvancedSearch && e.target.closest(`.${styles.menu}`) === null) {
        setOpenAdvancedSearch(false)
      }
      // 檢查是否點擊事件發生在排序菜單之外
      if (openSorting && e.target.closest(`.${styles.sortMenu}`) === null) {
        setOpenSorting(false)
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [openAdvancedSearch, openSorting])

  return (
    <div className={`${styles.filter} mx-md-3 mb-md-2 mb-3 row g-0`}>
      {/* 輸入搜尋 */}
      <div className="col ">
        <form className="d-flex" role="search">
          <div className="input-group position-relative d-inline-flex align-items-center">
            <input
              type="text"
              className={`form-control ${styles.searchBar}`}
              placeholder="搜尋"
              aria-label="from"
              aria-describedby="from"
              style={{
                borderRadius: 2.8,
                color: '#8e8777',
              }}
              name="keyword"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
            />
            <button
              className={`${styles.searchBtn}`}
              type="button"
              onClick={() => {
                setLoading(true)
                getProductsQs(true)
              }}
            >
              <i
                className="bi bi-search position-absolute"
                role="presentation"
                style={{
                  right: 3,
                  top: -1,
                  cursor: 'pointer',
                  // zIndex: 100,
                  color: '#fff',
                }}
              ></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col d-flex justify-content-end">
        {/* 進階搜尋 */}
        <div className={` ${styles.menu}`}>
          <button
            className={`${styles.btnAdSearch}`}
            onClick={toggleOpenAdvancedSearch}
          >
            進階搜尋
            <i
              className={`${styles.sortIcon} ms-1 bi bi-arrow-down-circle-fill`}
            ></i>
          </button>
          {openAdvancedSearch ? (
            <div className={`${styles.subMenu}`}>
              <span>預算上限</span>
              <br />
              <span className={`${styles.maxPrice}`}>NT$ {maxPrice}</span>
              <br />
              <div
                className={`d-flex justify-content-center pb-4 ${styles.priceBox}`}
              >
                <input
                  type="range"
                  min={10}
                  max={30000}
                  value={maxPrice}
                  onChange={(e) => {
                    setBudget(e.target.value)
                    handleMaxPriceChange(e)
                  }}
                  className={`${styles.priceRange}`}
                />
              </div>

              <br />
              <span>只挑選活動中商品</span>
              <div className="row gx-3 mt-3">
                <button
                  className={`col m-1 btn btn-secondary ${
                    selectDis ? 'btn-info' : 'btn-secondary'
                  } `}
                  onClick={() => {
                    toggleSelectDis()
                    if (!discount) {
                      setDiscount('1')
                    } else {
                      setDiscount('')
                    }
                  }}
                >
                  <i className="bi bi-tag-fill me-2"></i>
                  優惠中
                </button>
                <button
                  className={`col m-1 btn btn-secondary ${
                    selectNew ? 'btn-info' : 'btn-secondary'
                  }`}
                  onClick={() => {
                    toggleSelectNew()
                    if (!newArrival) {
                      setNewArrival('1')
                    } else {
                      setNewArrival('')
                    }
                  }}
                >
                  <i className={`bi bi-box2-heart-fill me-2`}></i>
                  新品
                </button>
              </div>
              <div className="row gx-3 mt-3">
                <button
                  className={`col m-1 btn btn-secondary ${
                    sortAsc ? 'btn-info' : 'btn-secondary'
                  }`}
                  type="button"
                  onClick={() => {
                    toggleSortAsc()
                    setOrderby('product_price*product_discount,asc')
                  }}
                >
                 <i class="bi bi-coin"></i> 低 - 高
                </button>
                <button
                  className={`col m-1 btn btn-secondary ${
                    sortDesc ? 'btn-info' : 'btn-secondary'
                  }`}
                  type="button"
                  onClick={() => {
                    toggleSortDesc()
                    setOrderby('product_price*product_discount,desc')
                  }}
                >
                  <i class="bi bi-coin"></i> 高 - 低
                </button>
              </div>
              <div className="row">
                <button
                  className={`col d-flex justify-content-center ${styles.btnSearch} mx-2 mt-2`}
                  onClick={() => {
                    toggleOpenAdvancedSearch()
                    setLoading(true)
                    getProductsQs(true)
                    const params = {
                      keyword,
                      cat_ids: catIds.join(','),
                      discount,
                      budget,
                      orderby,
                      newArrival,
                    }
                    router.push({
                      pathname: router.pathname,
                      query: params,
                    })
                    setproductOffset(0)
                  }}
                >
                  搜尋
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
