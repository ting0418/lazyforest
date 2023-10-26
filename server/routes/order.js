import express from 'express'
import pool from '../config/db.js'
import 'dotenv/config.js'

const router = express.Router()

// Join order_id from
router.get('/', async (req, res) => {
  const sql = `SELECT * FROM coupon`

  try {
    const [results] = await pool.query(sql)
    res.json(results) //回傳
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Database READ failed.' })
  }
})

router.get('/my_orders', async (req, res) => {
  const sql = ` SELECT 
                  order_id,  order_number, order_dt, order_status, order_amount
                FROM 
                  order_list 
                WHERE 
                  member_id = ?
                ORDER BY	
                  order_id DESC`

  try {
    const [results] = await pool.query(sql, [req.session.userId])
    res.json(results) //回傳
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Database READ failed.' })
  }
})

router.get('/my_order_items', async (req, res) => {
  const order_id = req.query.order_id
  const sql = ` SELECT 
                  order_item.quantity,
                  products.*
                FROM 
                  products INNER JOIN order_item on order_item.product_id = products.id 
                WHERE 
                  order_item.order_id = ?`

  try {
    const [results] = await pool.query(sql, [order_id])
    res.json(results) //回傳
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Database READ failed.' })
  }
})

export default router
