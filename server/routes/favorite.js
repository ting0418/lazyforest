import express from 'express'
const router = express.Router()

import { executeQuery } from '../models/base.js'
// import authenticate from '../middlewares/jwt.js'
import auth from '../middlewares/auth.js'

// 獲得某會員id的有加入到我的最愛清單中的商品id們
// , authenticate
router.get('/my-favorite', auth, async (req, res, next) => {
  // WHERE f.uid = ${req.user.id}
  console.log('NOOOOO')
  const userId = req.session.userId
  const sql = `SELECT collection.target_id
        FROM collection
        WHERE collection.member_id = ${userId}
        AND collection.collection_type = 'product'
        ORDER BY collection.target_id ASC;`

  const { rows } = await executeQuery(sql)
  // 將結果中的pid取出變為一個純資料的陣列
  const favorites = rows.map((v) => v.target_id)

  res.json({ favorites })
})

router.get('/all-products-no-login', async (req, res, next) => {
  const sql = `SELECT p.*
    FROM products AS p
    ORDER BY p.id ASC`

  const { rows } = await executeQuery(sql)

  res.json({ products: rows })
})

router.get('/all-products', auth, async (req, res, next) => {
  const userId = req.session.userId
  const sql = `
    SELECT products.* , IF(collection.id, 'true', 'false') AS is_favorite
    FROM products
    LEFT JOIN collection ON collection.target_id = products.id
    AND collection.member_id = ${userId}
    AND collection.collection_type = 'product'
    ORDER BY products.id ASC;
    `

  const { rows } = await executeQuery(sql)

  console.log(rows)

  // cast boolean
  const products = rows.map((v) => ({
    ...v,
    is_favorite: v.is_favorite === 'true',
  }))

  console.log(products)

  res.json({ products })
})

router.get('/fav-products', auth, async (req, res, next) => {
  const userId = req.session.userId

  const sql = `SELECT products.*
    FROM products
    INNER JOIN collection 
    ON collection.target_id = products.id
    AND collection.member_id = ${userId}
    AND collection.collection_type = 'product'
    ORDER BY products.id ASC`

  const { rows } = await executeQuery(sql)
  console.log(rows)
  res.json({ products: rows })
})

router.get('/fav-campground', auth, async (req, res, next) => {
  const userId = req.session.userId

  const sql = `SELECT campground.*
    FROM campground
    INNER JOIN collection 
    ON collection.target_id = campground.id
    AND collection.member_id = ${userId}
    ORDER BY campground.id ASC`

  const { rows } = await executeQuery(sql)
  console.log(rows)
  res.json({ campground: rows })
})

router.put('/:pid', auth, async (req, res, next) => {
  const pid = req.params.pid
  const userId = req.session.userId

  const sql = `INSERT INTO collection (collection_type, member_id, target_id) VALUES ('product',${userId}, ${pid})`

  const { rows } = await executeQuery(sql)

  console.log(rows.affectedRows)

  if (rows.affectedRows) {
    return res.json({ message: 'success', code: '200' })
  } else {
    return res.json({ message: 'fail', code: '400' })
  }
})

router.delete('/:pid', auth, async (req, res, next) => {
  const pid = req.params.pid
  const userId = req.session.userId

  const sql = `DELETE FROM collection WHERE collection_type='product' AND target_id=${pid} AND member_id=${userId}; `

  const { rows } = await executeQuery(sql)

  console.log(rows.affectedRows)

  if (rows.affectedRows) {
    return res.json({ message: 'success', code: '200' })
  } else {
    return res.json({ message: 'fail', code: '400' })
  }
})

//
router.get('/my-favorite-camp', auth, async (req, res, next) => {
  // WHERE f.uid = ${req.user.id}
  const userId = req.session.userId
  const sql = `SELECT collection.target_id
        FROM collection
        WHERE collection.member_id = ${userId}
        AND collection.collection_type = 'camp'
        ORDER BY collection.target_id ASC;`

  const { rows } = await executeQuery(sql)
  // 將結果中的pid取出變為一個純資料的陣列
  const favorites = rows.map((v) => v.target_id)

  res.json({ favorites })
})

export default router
