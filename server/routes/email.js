import express from 'express'
import transporter from '../config/mail.js'
import 'dotenv/config.js'
import { render } from 'pug'
// import { random } from 'lodash'

const router = express.Router()

/* 寄送email的路由 */
router.get('/send', function (req, res, next) {
  const userEmail = req.body.email
  // email內容
  function getNewPassword() {
    const min = 10000000 // 最小值（8位数的最小值）
    const max = 99999999 // 最大值（8位数的最大值）
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    return random
  }

  const newPwd = getNewPassword()
  console.log(newPwd)
  const mailOptions = {
    from: `"LazyForest"<${process.env.SMTP_TO_EMAIL}>`,
    to: `tzuyun1019@gmail.com`,
    subject: '這是一封測試電子郵件',
    text: `你好， \r\n已幫您重設密碼。密碼為:${newPwd}\r\n\r\n敬上\r\n開發團隊`,
  }

  // 寄送
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      return res.status(400).json({ message: 'Failure', detail: err })
    } else {
      // 成功回覆的json
      db.query(
        'UPDATE members SET password=? WHERE email=?',
        [newPwd, userEmail],
        (err) => {
          if (err) {
            console.error(err)
            return res
              .status(500)
              .json({ error: 'Failed to update data in the database' })
          }
          res.json({ message: 'Data updated successfully' })
        }
      )

      return res.json({ message: 'Success' })
    }
  })
})

export default router
