import React from 'react'
import styles from '@/components/product/product-fav-in-pid.module.scss'
import axios from 'axios'
import { useUserContext } from '@/context/UserContext'

export default function ProductFavPid({ product, id, handleTriggerFav }) {
  const { favorites, setFavorites } = useUserContext()

  const addFavToServer = async (pid) => {
    const res = await axios.put(
      `http://localhost:3005/api/favorite/${pid}`,
      {}, // put 第二參數是data，這裡雖然不需要，但還是要加上空物件
      {
        withCredentials: true,
      }
    )

    if (res.data.message === 'success') {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      handleTriggerFav(pid)
    }
  }

  const removeFavToServer = async (pid) => {
    const res = await axios.delete(
      `http://localhost:3005/api/favorite/${pid}`,
      {
        withCredentials: true,
      }
    )

    if (res.data.message === 'success') {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      handleTriggerFav(pid)
    }
  }

  return (
    <>
      {/* 收藏按鈕 */}
      {favorites.includes(id) ? (
        <div className={`${styles.hoverBtnGroup}`}>
          <button
            className={` ${styles.hoverBtn} d-flex justify-content-center align-items-center`}
            onClick={() => {
              removeFavToServer(id)
            }}
          >
            <i className="bi bi-heart-fill fs-4"></i>
          </button>
        </div>
      ) : (
        <div className={`${styles.hoverBtnGroup}`}>
          <button
            className={` ${styles.hoverBtn} d-flex justify-content-center align-items-center`}
            onClick={() => {
              addFavToServer(id)
            }}
          >
            <i className="bi bi-heart fs-4"></i>
          </button>
        </div>
      )}
    </>
  )
}
