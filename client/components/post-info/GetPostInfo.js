import { useEffect } from 'react'
import axios from 'axios'

export default function GetPostInfo({ onInfoFetched, pid }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 路由
        const response = await axios.get(
          'http://localhost:3005/api/postlist/' + pid
        )
        console.log(response.data)
        onInfoFetched(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }

    fetchData()
  }, [])
}
