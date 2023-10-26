import express from 'express'
import pool from '../config/db.js'
import LinePay from 'line-pay-v3'
import 'dotenv/config.js'

const router = express.Router()

// import { readJsonFile } from '../utils/json-tool.js'

router.post('/', async (req, res, next) => {
  let responseObj // 用來儲存最後要送回去的網址
  // 從req拿到client送ㄉJSON
  const requestData = req.body
  console.log(requestData)
  //先將order寫進資料庫 (order_status為0, 到checkout-end再將status update為1)
  // 寫進資料庫(Order_List)
  const sql = `
        INSERT INTO order_list (order_number,
                                member_id,
                                order_amount,
                                order_dt,
                                order_status,
                                paymethod,
                                name,
                                email,
                                phone,
                                invoice_type,
                                invoice_number,
                                memo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
  // paymethod, 預約營地還沒加付款方式

  const timestamp = Date.now()
  const shortTimestamp = timestamp.toString().substr(-8) // 取最後8位
  const orderNumber = shortTimestamp
  const currentDate = new Date()
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')
  const values = [
    orderNumber,
    3, //先假設是member 1
    requestData.orderData.netTotal,
    formattedDate,
    0, //order_status為0
    requestData.ordercheckoutData.payMethod,
    requestData.ordercheckoutData.name,
    requestData.ordercheckoutData.email,
    requestData.ordercheckoutData.phoneNumber,
    requestData.ordercheckoutData.invoiceType,
    requestData.ordercheckoutData.inputValue,
    requestData.ordercheckoutData.memo,
  ]
  // // 在server端處理數據，寫進資料庫
  try {
    // 1. insert order_list
    const [results] = await pool.query(sql, values)
    // 2. Get the last inserted order_id.
    const order_id = results.insertId
    // 3. insert order_item
    const sqlOrderItem = `
      INSERT INTO order_item (product_id, camp_id, zone_id, order_id, quantity)
      VALUES (?, ?, ?, ?, ?);
      `

    // 遍歷 requestData.cart 中的每一個商品項目並將其插入到 order_item 數據表
    for (let item of requestData.reservationData) {
      // 創建一個數組存放要插入到 order_item 表的資料
      const valuesOrderItem = [
        // 訂單的 ID
        0,
        item.camp_id, // 假設 item.id 是您的產品 ID
        item.zone_id,
        order_id,
        item.quantity, // 商品的數量
      ]
      // 執行 SQL 查詢，將商品項目插入到 order_item 表中
      await pool.query(sqlOrderItem, valuesOrderItem)
    }
    responseObj = { url: 'http://localhost:3000/ordercheckout-finish' }
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Database insertion failed.' })
  }

  if (requestData.ordercheckoutData.payMethod === 'LINEPAY') {
    // LINE 相關設定
    const channel_id = process.env.LINE_CHANNEL_ID
    const channel_secret = process.env.LINE_CHANNEL_SECRET

    const linePay = new LinePay({
      channelId: channel_id,
      channelSecret: channel_secret,
      uri: 'https://sandbox-api-pay.line.me',
    })

    // //從這裡開始定義商品
    const requestBody = req.body

    // 原始總金額
    // const originalTotal = requestBody.cart.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // )
    // 使用折價券後的金額
    // const netTotal = requestBody.orderData.netTotal
    // 虛擬商品(折價券)的金額
    // const discountAmount = originalTotal - netTotal

    // 創建虛擬的折價券產品
    // const discountItem = createDiscountItem(discountAmount)

    // 將它加入到購物車中
    // requestBody.cart.push(discountItem)

    // // 根據cart裡面的內容產生 linepay需要ㄉproducts
    const products = requestBody.reservationData.map((item) => ({
      id: item.camp_id,
      name: item.camp_name + item.zone_name,
      imageUrl: item.camp_img,
      quantity: item.quantity,
      price: item.zone_price,
    }))

    const totalPackageAmount = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    )

    const orderForLinePay = {
      amount: requestData.orderData.netTotal,
      currency: 'TWD',
      orderId: 'Order' + new Date().getTime(), // 使用timestamp當order ID
      packages: [
        {
          id: 'Package' + new Date().getTime(), // 使用timestamp當pachage ID
          amount: totalPackageAmount, // 使用真正的 package 總價格
          name: 'OrderPackage', // 暫時ㄉpackage name
          products: products,
        },
      ],
      redirectUrls: {
        //轉址回testcheckout-finish
        confirmUrl: 'http://localhost:3000/ordercheckout-finish',
        cancelUrl: 'https://example.com/cancelUrl',
      },
    }

    linePay
      .request(orderForLinePay)
      .then((linePayResponse) => {
        console.log(linePayResponse)
        console.log(linePayResponse.info.paymentUrl.web)
        if (
          linePayResponse &&
          linePayResponse.info &&
          linePayResponse.info.paymentUrl &&
          linePayResponse.info.paymentUrl.web
        ) {
          // 返回 LINE PAY產生的 URL 給前端
          responseObj = { url: linePayResponse.info.paymentUrl.web }
          res.json(responseObj)
        } else {
          // 如果沒有可用的 URL，則返回error
          res.status(400).send('Payment URL not available.')
        }
      })
      .catch((error) => {
        // 處理error
        console.error(error)
        res.status(500).send('Internal Server Error.')
      })
  } else {
    res.json(responseObj)
  }
})

export default router
