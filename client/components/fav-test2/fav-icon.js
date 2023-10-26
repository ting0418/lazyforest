import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

// 愛心圖示(svg)
const Heart = ({ size = 20, color = 'red' }) => (
  <svg
    className="heart"
    viewBox="0 0 32 29.6"
    style={{ width: size, fill: color, stroke: 'red', position: 'relative' }}
  >
    <path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z" />
  </svg>
)

export default function FavFcon({ is_favorite, handleTriggerFav, id }) {
  // 由context取得authJWT-判斷是否能執行add或remove用，favorites決定愛心圖案用
  const { authJWT, favorites } = useAuthJWT()

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
      {/* 由favorites狀態決定呈現實心or空心愛愛圖示 */}
      {favorites.includes(id) ? (
        <button
          style={{ padding: 0, border: 'none', background: 'none' }}
          onClick={() => {
            // 沒登入不能用
            if (!authJWT.isAuth) return alert('會員才能使用!')

            removeFavToServer(id)
          }}
        >
          <Heart />
        </button>
      ) : (
        <button
          style={{ padding: 0, border: 'none', background: 'none' }}
          onClick={() => {
            // 沒登入不能用
            if (!authJWT.isAuth) return alert('會員才能使用!')

            addFavToServer(id)
          }}
        >
          <Heart color="white" />
        </button>
      )}
    </>
  )
}
