import express from 'express'
const router = express.Router()
// import { readJsonFile } from '../utils/json-tool.js'
import pool from '../config/db.js' 
import { executeQuery } from '../models/base.js'
import auth from '../middlewares/auth.js'

import {
  getCampground,
  getCampgroundWithQS,
  getCampgroundById,
  countWithQS,
} from '../models/campground.js'

//獲得全部資料
router.get('/', async (req, res) => {
  try {
    const query = ` 
    SELECT  
        campground.*,
        facility.*,
        camp_zone.*
    FROM campground
    LEFT JOIN facility ON campground.facility_id = facility.facility_id
    LEFT JOIN camp_zone ON campground.zone_id = camp_zone.id
    ;`
    const campgroundResult = await pool.query(query)

    let finalData = campgroundResult[0]
    // console.log(finalData);

    res.json({ finalData })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred' })
  }
})

// 獲得單筆資料
router.get('/:cid', async (req, res, next) => {
  try {
    const cid = req.params.cid
    const query =
      `
    SELECT
    *
    FROM
    campground
    RIGHT JOIN camp_zone ON campground.zone_id = camp_zone.id
    LEFT JOIN camp_img ON campground.id = camp_img.id
    WHERE campground.id = ` +
      cid +
      `;`

    console.log(cid)

    const campgroundResult = await pool.query(query, [cid])

    if (campgroundResult[0].length === 0) {
      return res.status(404).json({ message: 'Campground not found' })
    }

    const finalData = campgroundResult[0]
    res.json({ finalData })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred' })
  }
})

//收藏
router.put('/:cid', auth, async (req, res, next) => {
  console.log('QQQQ')
  const cid = req.params.cid
  const userId = req.session.userId

  const campSql =
    `SELECT * FROM collection WHERE collection_type = 'camp' AND target_id =` +
    cid
  const campRows = await pool.query(campSql)

  // check data exist or not
  if (campRows[0].length === 0) {
    const addSql =
      `INSERT INTO collection (collection_type, member_id, target_id) VALUES ('camp' , ` +
      userId +
      `, ` +
      cid +
      `)`
    const addRows = await pool.query(addSql)
    if (addRows == undefined || addRows[0].affectedRows !== 1) {
      return res.json({ message: 'fail', code: '400' }) // error
    } else {
      return res.json({ message: 'success', code: '200' }) // added
    }
  } else {
    // console.log("delete")
    // FIXME: asm
    const removeSql =
      `DELETE FROM collection WHERE target_id = ` +
      cid +
      ` AND collection_type = 'camp'`
    const removeRows = await pool.query(removeSql)
    if (removeRows[0].affectedRows === 1) {
      return res.json({ message: 'success', code: '200' }) // deleted
    } else {
      return res.json({ message: 'fail', code: '400' }) // error
    }
  }
})

//   const sql = `INSERT INTO collection (collection_type, member_id, target_id) VALUES ('camp', '` + userId +`',' ` + cid + `')`

//   const { rows } = await pool.query(sql)

//   if (rows.affectedRows) {
//     return res.json({ message: 'success', code: '200' })
//   } else {
//     return res.json({ message: 'fail', code: '400' })
//   }
// })

// router.get('/', async (req, res) => {
//   try {
//     const campgroundQuery = 'SELECT * FROM campground';
//     const campgroundResult = await pool.query(campgroundQuery);

//     const facilityQuery = 'SELECT * FROM facility';
//     const facilityResult = await pool.query(facilityQuery);

//     const response = {
//       campground: campgroundResult.rows,
//       facility: facilityResult.rows,
//     };
//     // console.log(campgroundResult[0][0]);
//     // console.log('Facility Query Result:', facilityResult[0]);
//     let finalData = campgroundResult[0].map((cd,index)=>{
//       let facility = facilityResult[0].find(fd=>fd.facility_id)
//       cd.facility = facility;
//       return cd;
//     });
//     // console.log(finalData);
//     res.json({finalData});
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// // 獲得單筆資料
// router.get('/:cid', async (req, res, next) => {
//   console.log(req.params)

//   // 讀入範例資料
//   const finalData = await getCampgroundById(req.params.cid)

//   if (finalData) {
//     return res.json({ ...finalData })
//   } else {
//     return res.json({})
//   }
// })

// router.get('/', async (req, res) => {
//   try {
//     const query = `
//     SELECT
//     campground.*,
//     facility.*,
//     camp_zone.zone_id,
//     camp_zone.id
// FROM campground
// JOIN facility ON campground.facility_id = facility.facility_id
// JOIN camp_zone ON campground.zone_id = camp_zone.zone_id;
//     `

//     const { rows } = await pool.query(query) // 使用解构获取 rows
//     console.log(rows) // 检查结果是否包含预期的数据
//     res.json(rows) // 直接返回 rows 数组
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     res.status(500).json({ error: 'An error occurred' })
//   }
// })

// 專用處理sql字串的工具，主要format與escape，防止sql injection
// import sqlString from 'sqlstring'

// // 獲得所有資料，加入分頁與搜尋字串功能，單一資料表處理
// // products/qs?page=1&keyword=xxxx&cat_ids=1,2&sizes=1,2&tags=3,4&colors=1,2,3&orderby=id,asc&perpage=10&price_range=1500,10000
// router.get('/qs', async (req, res, next) => {
//   // 獲取網頁的搜尋字串
//   const {
//     page,
//     keyword,
//     cat_ids,
//     colors,
//     tags,
//     sizes,
//     orderby,
//     perpage,
//     price_range,
//   } = req.query

//   // TODO: 這裡可以檢查各query string正確性或給預設值，檢查不足可能會產生查詢錯誤

//   // 建立資料庫搜尋條件
//   const conditions = []

//   // 關鍵字 keyword 使用 `name LIKE '%keyword%'`
//   conditions[0] = keyword
//     ? `name LIKE ${sqlString.escape('%' + keyword + '%')}`
//     : ''

//   // 分類，cat_id 使用 `cat_id IN (1, 2, 3, 4, 5)`
//   conditions[1] = cat_ids ? `cat_id IN (${cat_ids})` : ''

//   // 顏色: FIND_IN_SET(1, color) OR FIND_IN_SET(2, color)
//   const color_ids = colors ? colors.split(',') : []
//   conditions[2] = color_ids
//     .map((v) => `FIND_IN_SET(${Number(v)}, color)`)
//     .join(' OR ')

//   //  標籤: FIND_IN_SET(3, tag) OR FIND_IN_SET(2, tag)
//   const tag_ids = tags ? tags.split(',') : []
//   conditions[3] = tag_ids
//     .map((v) => `FIND_IN_SET(${Number(v)}, tag)`)
//     .join(' OR ')

//   //  尺寸: FIND_IN_SET(3, size) OR FIND_IN_SET(2, size)
//   const size_ids = sizes ? sizes.split(',') : []
//   conditions[4] = size_ids
//     .map((v) => `FIND_IN_SET(${Number(v)}, size)`)
//     .join(' OR ')

//   // 價格
//   const priceRanges = price_range ? price_range.split(',') : []
//   const min = Number(priceRanges[0])
//   const max = Number(priceRanges[1])
//   // 價格要介於1500~10000間
//   if (min >= 1500 && max <= 10000) {
//     conditions[5] = `price BETWEEN ${min} AND ${max}`
//   }

//   //各條件為AND相接(不存在時不加入where從句中)
//   const conditionsValues = conditions.filter((v) => v)

//   // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
//   const where =
//     conditionsValues.length > 0
//       ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(' AND ')
//       : ''

// // 分頁用
// // page預設為1，perpage預設為10
// const perpageNow = Number(perpage) || 10
// const pageNow = Number(page) || 1
// const limit = perpageNow
// // page=1 offset=0 ; page=2 offset= perpage * 1; ...
// const offset = (pageNow - 1) * perpageNow

//   // 排序用，預設使用id, asc
//   const order = orderby
//     ? { [orderby.split(',')[0]]: orderby.split(',')[1] }
//     : { id: 'asc' }

//   // 查詢
//   const total = await countWithQS(where)
//   const campground = await getCampgroundWithQS(where, order, limit, offset)

//   // json回傳範例
//   //
//   // {
//   //   total: 100,
//   //   perpage: 10,
//   //   page: 1,
//   //   data:[
//   //     {id:123, name:'',...},
//   //     {id:123, name:'',...}
//   //   ]
//   // }

//   const result = {
//     total,
//     perpage: Number(perpage),
//     page: Number(page),
//     data: campground,
//   }

//   res.json(result)
// })

// 獲得所有資料
// router.get('/', async (req, res, next) => {
//   // 讀入範例資料
//   const campground = await getCampground()
//   res.json({ campground })
// })

export default router
