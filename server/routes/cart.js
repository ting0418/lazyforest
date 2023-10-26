import express from 'express'
import pool from '../config/db.js'
import 'dotenv/config.js'

const router = express.Router()

// 取得所有優惠券
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

export default router
