import express from 'express'
const router = express.Router()
import pool from '../config/db.js'
import { isEmpty } from '../utils/tool.js'
import multer from 'multer'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/forum')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})
const upload = multer({ storage: storage })
import {
  getForums,
  getForumsWithQS,
  getForumById,
  // countWithQS,
  updateUserById,
  // updateUser,
  getCommentsWithQS,
  getCount,
  createUser,
} from '../models/postlist.js'

// SELECT forum.*, member.*
// FROM forum
// LEFT JOIN member ON forum.member_id = member.id

// 拉到全部資料
router.get('/', async function (req, res, next) {
  try {
    const sql = `
      SELECT
    forum.id AS forum_id,
    forum.title AS title,
    forum.type AS type,
    forum.content AS content,
    forum.img_1,
    forum.img_2,
    forum.img_3,
    forum.forum_dt AS forum_dt,
    forum.likesCount AS likesCount,

    members.id AS member_id,
    members.name,
    (
      SELECT COUNT(*)
      FROM comment
      WHERE comment.forum_id = forum.id
    ) AS comment_count
  FROM forum
  LEFT JOIN members ON forum.member_id = members.id
  ORDER BY forum.forum_dt DESC;
    `
    const result = await pool.query(sql)

    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' })
  }
})
//熱門文章
router.get('/famous', async (req, res, next) => {
  try {
    const sql = `
      SELECT
        forum.id AS forum_id,
        forum.type AS type,
        forum.title AS title,
        forum.img_1,
        forum.img_2,
        forum.img_3,
        forum.content AS content,
        forum.forum_dt AS forum_dt,
        forum.likesCount AS likesCount,
        members.id AS member_id,
        members.name,
        (
          SELECT COUNT(*) 
          FROM comment 
          WHERE comment.forum_id = forum.id
        ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
      WHERE likesCount > 500;
    `
    const result = await pool.query(sql)
    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' })
  }
})
// 心得
router.get('/experience', async (req, res, next) => {
  try {
    const sql = `
      SELECT
        forum.id AS forum_id,
        forum.type AS type,
        forum.title AS title,
        forum.img_1,
        forum.img_2,
        forum.img_3,
        forum.content AS content,
        forum.forum_dt AS forum_dt,
        forum.likesCount AS likesCount,
        members.id AS member_id,
        members.name,
        (
          SELECT COUNT(*) 
          FROM comment 
          WHERE comment.forum_id = forum.id
        ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
      WHERE type="心得";
    `
    const result = await pool.query(sql)
    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' })
  }
})
// 開箱
router.get('/open', async (req, res, next) => {
  try {
    const sql = `
      SELECT
        forum.id AS forum_id,
        forum.type AS type,
        forum.title AS title,
        forum.img_1,
        forum.img_2,
        forum.img_3,
        forum.content AS content,
        forum.forum_dt AS forum_dt,
        forum.likesCount AS likesCount,
        members.id AS member_id,
        members.name,
        (
          SELECT COUNT(*) 
          FROM comment 
          WHERE comment.forum_id = forum.id
        ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
      WHERE type="開箱";
    `
    const result = await pool.query(sql)
    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' })
  }
})
// 二手
router.get('/used', async (req, res, next) => {
  try {
    const sql = `
      SELECT
        forum.id AS forum_id,
        forum.type AS type,
        forum.title AS title,
        forum.img_1,
        forum.img_2,
        forum.img_3,
        forum.content AS content,
        forum.forum_dt AS forum_dt,
        forum.likesCount AS likesCount,
        members.id AS member_id,
        members.name,
        (
          SELECT COUNT(*) 
          FROM comment 
          WHERE comment.forum_id = forum.id
        ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
      WHERE type="二手";
    `
    const result = await pool.query(sql)
    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' })
  }
})
// 依照時間新到舊
router.get('/newest', async (req, res, next) => {
  try {
    const sql = `
    SELECT
    forum.id AS forum_id,
    forum.title AS title,
    forum.type AS type,
    forum.img_1,
    forum.img_2,
    forum.img_3,
    forum.content AS content,
    forum.forum_dt AS forum_dt,
    forum.likesCount AS likesCount,

    members.id AS member_id,
    members.name,
    (
      SELECT COUNT(*)
      FROM comment
      WHERE comment.forum_id = forum.id
    ) AS comment_count
  FROM forum
  LEFT JOIN members ON forum.member_id = members.id
  ORDER BY forum.forum_dt DESC;

    `
    const result = await pool.query(sql)

    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data0.' })
  }
})
// 依照時間舊到新
router.get('/oldest', async (req, res, next) => {
  try {
    const sql = `
    SELECT
  forum.id AS forum_id,
  forum.title AS title,
  forum.type AS type,
  forum.img_1,
  forum.img_2,
  forum.img_3,
  forum.content AS content,
  forum.forum_dt AS forum_dt,
  forum.likesCount AS likesCount,
  members.id AS member_id,
  members.name,
  (
    SELECT COUNT(*) 
    FROM comment 
    WHERE comment.forum_id = forum.id
  ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
      ORDER BY forum.forum_dt ASC
    `
    const result = await pool.query(sql)
    console.log('資料', result)
    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data1.' })
  }
})
// 依照人氣多到少
router.get('/popularity', async (req, res, next) => {
  try {
    const sql = `
    SELECT
    forum.id AS forum_id,
    forum.title AS title,
    forum.type AS type,
    forum.img_1,
    forum.img_2,
    forum.img_3,
    forum.content AS content,
    forum.forum_dt AS forum_dt,
    forum.likesCount AS likesCount,
    members.id AS member_id,
    members.name,
    (
      SELECT COUNT(*) 
      FROM comment 
      WHERE comment.forum_id = forum.id
    ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
      ORDER BY forum.likesCount DESC
    `
    const result = await pool.query(sql)

    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data2.' })
  }
})
// 依照人氣少到多
router.get('/oldestFirst', async (req, res, next) => {
  try {
    const sql = `
    SELECT
    forum.id AS forum_id,
    forum.title AS title,
    forum.type AS type,
    forum.img_1,
    forum.img_2,
    forum.img_3,
    forum.content AS content,
    forum.forum_dt AS forum_dt,
    forum.likesCount AS likesCount,
    members.id AS member_id,
    members.name,
    (
      SELECT COUNT(*) 
      FROM comment 
      WHERE comment.forum_id = forum.id
    ) AS comment_count
      FROM forum
      LEFT JOIN members ON forum.member_id = members.id
ORDER BY forum.likesCount ASC

    `
    const result = await pool.query(sql)

    res.json({ forums: result[0] })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data3.' })
  }
})
// 細節頁路由
router.get('/:id', async function (req, res, next) {
  try {
    const forumId = req.params.id

    // 關聯評論資料庫
    const commentsSql = `
    SELECT
    comment.*,
    members.name
  FROM comment
  INNER JOIN members ON comment.member_id = members.id
  WHERE comment.forum_id = ?
  ORDER BY comment.date DESC;
    `

    const commentsResult = await pool.query(commentsSql, [forumId])

    // 關聯文章資料庫
    const forumSql = `
      SELECT
        forum.*,
        members.name
      FROM forum
      INNER JOIN members ON forum.member_id = members.id
      WHERE forum.id = ?;
    `
    const forumResult = await pool.query(forumSql, [forumId])

    return res.json({
      message: 'success',
      code: '200',
      forum: forumResult[0],
      comments: commentsResult,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' })
  }
})

// 寫評論
router.put('/:id', async function (req, res, next) {
  const forums = await updateUserById(req.body, req.params.id)
  return res.json({ message: 'success', code: '200', forums })
})
// 測試
router.post(
  '/upload3',
  upload.array('avatars', 3), // 上傳來的檔案(多個檔案，欄位名稱為avatar)
  async function (req, res, next) {
    // req.files 即上傳來的檔案(avatar這個檔案)
    // req.body 其它的文字欄位資料…
    console.log('req.files', req.files)
    const filename = req.files
    if (req.files) {
      console.log(req.files)
      return res.json({ message: 'success', code: '200', filename })
    } else {
      console.log('沒有上傳檔案')
      return res.json({ message: 'fail', code: '409' })
    }
  }
)

// 單張圖片上傳
// router.post(
//   '/upload2',
//   upload.single('avatar'), // 上傳來的檔案(這是單個檔案，欄位名稱為avatar)
//   async function (req, res, next) {
//     console.log(req.file, req.body)
//     const filename = req.file
//     if (req.file) {
//       console.log(req.file)
//       return res.json({ message: 'success', code: '200', filename })
//     } else {
//       console.log('沒有上傳檔案')
//       return res.json({ message: 'fail', code: '409' })
//     }
//   }
// )
router.post('/', async function (req, res, next) {
  // article是從瀏覽器來的資料
  const article = req.body
  // 檢查從瀏覽器來的資料，如果為空物件則失敗
  if (isEmpty(article)) {
    return res.json({ message: 'fail', code: '400' })
  }
  // 這裡可以再檢查從react來的資料，哪些資料為必要(name, username...)
  // console.log('這art', article)
  // 新增至資料庫
  const result = await createUser(article)
  // console.log('這是我想要的資料', req)
  // 不存在insertId -> 新增失敗
  if (!result.insertId) {
    return res.json({
      message: '不存在insertId -> 新增失敗fail',
      code: '400',
    })
  }

  // 成功加入資料庫的回應
  return res.json({
    message: 'success',
    code: '200',
    article: { ...result, id: result.insertId },
  })
})

export default router
