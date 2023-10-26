import React, { useState } from 'react'
import styles from '@/components/product/product-counter.module.scss'

export default function ProductCounter({ handleCounterChange }) {
  const [amount, setAmount] = useState(1)
  const handlePlus = () => {
    if (amount < 10) {
      setAmount((prevAmount) => prevAmount + 1)
      handleCounterChange(amount + 1)
    }
  }

  const handleMinus = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1)
      handleCounterChange(amount - 1)
    }
  }
  return (
    <>
      {/* counter spin box */}
      <div className="btn-group d-flex justify-contnet-center align-items-center">
        <button
          type="button"
          className={`btn ${styles.minusBtn}`}
          onClick={handleMinus}
        >
          -
        </button>
        <div className={`${styles.countNumber}`}>
          <div>{amount}</div>
        </div>
        <button
          type="button"
          className={`btn ${styles.plusBtn}`}
          onClick={handlePlus}
        >
          +
        </button>
      </div>
    </>
  )
}
