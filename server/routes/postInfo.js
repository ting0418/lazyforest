import express from 'express'
const router = express.Router()
import { isEmpty } from '../utils/tool.js'
import { createUser } from '../models/postinfo.js'
// 發布評論
router.post('/:id', async function (req, res, next) {
  const comment = req.body
  // 檢查從瀏覽器來的資料，如果為空物件則失敗
  if (isEmpty(comment)) {
    return res.json({ message: 'fail', code: '400' })
  }

  // 這裡可以再檢查從react來的資料
  console.log(comment)

  // 新增至資料庫
  const result = await createUser(comment)
  // 不存在insertId -> 新增失敗
  if (!result.insertId) {
    return res.json({ message: 'fail', code: '400' })
  }
  // 成功加入資料庫的回應
  return res.json({
    message: 'success',
    code: '200',
    comment: { ...comment, id: result.insertId },
  })
})
export default router
