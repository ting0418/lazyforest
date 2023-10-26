// import { useEffect } from 'react'
// import axios from 'axios'

// export default function GetPostData({ onDataFetched }) {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 路由
//         const response = await axios.get('http://localhost:3005/api/postlist')
//         console.log(response.data)
//         onDataFetched(response.data)
//       } catch (error) {
//         console.error('資料獲取失敗:', error)
//       }
//     }
//     fetchData()
//   }, [])
// }
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function GetPostData({ onDataFetched, category }) {
//   const [selectedCategory, setSelectedCategory] = useState('依照時間：新到舊')
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let apiUrl = ''
//         switch (selectedCategory) {
//           case '依照時間：新到舊':
//             apiUrl = 'http://localhost:3005/api/postlist/newest'
//             break
//           case '依照時間：舊到新':
//             apiUrl = 'http://localhost:3005/api/postlist/oldest'
//             break
//           case '依照人氣：多到少':
//             apiUrl = 'http://localhost:3005/api/postlist/popularity'
//             break
//           case '依照時間：少到多':
//             apiUrl = 'http://localhost:3005/api/postlist/oldestfirst'
//             break
//           default:
//             break
//         }

//         if (apiUrl) {
//           const response = await axios.get(apiUrl)
//           console.log(response.data)
//           setData(response.data)
//         }
//       } catch (error) {
//         console.error('資料獲取失敗:', error)
//       }
//     }

//     fetchData()
//   }, [selectedCategory, onDataFetched])
// }
