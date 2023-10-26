import React, { useState, useEffect } from 'react'
import Vouchers from '@/components/member-center/voucher'

export default function Voucher() {
  const [vouchers, setVouchers] = useState([])

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
        // const productCount = data.products.length
        // setProductCount(productCount)
        setVouchers(data.vouchers)
      } catch (error) {
        console.log({ error })
      }
    }

    loadVoucherList()
  }, [])

  return (
    <div className="container">
      <Vouchers />
    </div>
  )
}
