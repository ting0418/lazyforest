import React from 'react'
import axios from 'axios'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/router'
import styles from '@/components/popup/logout.module.scss'

function Logout() {
  const userctx = useUserContext()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // 发送登出请求到后端
      await axios.post(
        'http://localhost:3005/api/auth/logout',
        {},
        {
          withCredentials: true,
        }
      )

      // 清除前端存储的用户信息
      userctx.setUser({ name: 'Guest' })

      // 重定向到登录页或其他目标页面
      router.push('/index') // 你可以根据实际情况修改目标页面
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  return (
    <button className={`mt-2 ${styles.btn}`} onClick={handleLogout}>
      登出
    </button>
  )
}

export default Logout
