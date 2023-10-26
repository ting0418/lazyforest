import React, { useState } from 'react'
import styles from '@/components/product/product-filter.module.scss'

export default function ProductFilter() {
  const [maxPrice, setMaxPrice] = useState(100)

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value))
  }

  return (
    <>
      <div className="btn-group">
        <button
          type="button"
          className={`btn btn-secondary dropdown-toggle`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          金額：高 - 低
        </button>
        <ul className={`dropdown-menu dropdown-menu-end mt-2 `}>
          <div>
            <span>價格上限</span>
            <label>
              NT$ {maxPrice}
              <input
                type="range"
                min={0}
                max={1000}
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </label>
            <span>只挑選活動中商品</span>
            <div className="d-flex">
              <div className="btn btn-dark">優惠中</div>
              <div className="btn btn-dark">新品</div>
            </div>
            <button className="btn btn-dark">搜尋</button>
          </div>
        </ul>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className={`btn btn-secondary dropdown-toggle`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          金額：高 - 低
        </button>
        <ul className={`dropdown-menu dropdown-menu-end mt-2 `}>
          <li>
            <button className="dropdown-item" type="button">
              金額：低 - 高
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              人氣：高 - 低
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
