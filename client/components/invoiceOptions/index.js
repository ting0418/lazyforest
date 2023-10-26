import React, { useState } from 'react'
import styles from '@/styles/testcart.module.scss'
export default function InvoiceOptions({
  invoiceType,
  setInvoiceType,
  inputValue,
  setInputValue,
}) {
  // const [invoiceType, setInvoiceType] = useState('')
  // const [inputValue, setInputValue] = useState('')
  const handleInvoiceTypeChange = (e) => {
    const selectedType = e.target.value
    setInvoiceType(selectedType)

    if (selectedType === '不需要發票') {
      setInputValue('您不需要發票') // 或其他你覺得適合的非空值
    } else if (selectedType === '紙本發票') {
      setInputValue('將會與商品一起寄送給您') // 或其他你覺得適合的非空值
    } else {
      setInputValue('') // 將其設為空，以便用戶可以輸入
    }
  }
  const renderInputField = () => {
    switch (invoiceType) {
      case '電子發票':
        return (
          <input
            type="text"
            className={` ${styles.citysize} my-3 mb-md-3 me-md-4`}
            placeholder=" 請輸入會員載具"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )
      case '捐贈發票':
        return (
          <input
            type="text"
            className={` ${styles.citysize} my-3 mb-md-3 me-md-4`}
            placeholder=" 請輸入公益組織號碼"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )
      case '紙本發票':
        // return '發票將隨著商品一起寄達'
        return (
          <input
            type="text"
            className={` ${styles.citysize} my-3 mb-md-3 me-md-4`}
            placeholder={' 發票將與商品一起寄送'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={invoiceType} // 如果 invoiceType 為空或未定義，則禁用此輸入框
          />
        )
      case '不需要發票':
        // return '您不需要發票'
        return (
          <input
            type="text"
            className={` ${styles.citysize} my-3 mb-md-3 me-md-4`}
            placeholder={' 您不需要發票'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={invoiceType} // 如果 invoiceType 為空或未定義，則禁用此輸入框
          />
        )
      default:
        return (
          <input
            type="text"
            className={` ${styles.citysize} my-3 mb-md-3 me-md-4`}
            placeholder={invoiceType ? '請輸入相關資訊' : ' 請先選擇發票類型'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!invoiceType} // 如果 invoiceType 為空或未定義，則禁用此輸入框
          />
        )
    }
  }
  return (
    <div>
      <div
        className={`d-flex justify-content-around align-items-center mb-3 mt-md-3 ${styles.mobileflexcolumn}`}
      >
        <select
          value={invoiceType}
          onChange={handleInvoiceTypeChange}
          className={` ${styles.citysize} my-3 mb-md-3 ms-md-4`}
        >
          <option value="">請選擇發票類型</option>
          <option value="電子發票">電子發票</option>
          <option value="捐贈發票">捐贈發票</option>
          <option value="紙本發票">紙本發票</option>
          <option value="不需要發票">不需要發票</option>
        </select>

        <div className="input-field ">{renderInputField()}</div>
      </div>
    </div>
  )
}
