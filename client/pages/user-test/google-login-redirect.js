import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import { useAuth } from '@/hooks/use-auth'
import GoogleLogo from '@/components/icons/google-logo'
import { useEffect } from 'react'

export default function GoogleLogin() {
  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { logoutFirebase, loginGoogleRedirect, initApp } = useFirebase()
  const { auth, setAuth } = useAuth()

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return

    const res = await axios.post(
      'http://localhost:3005/api/google-login/session',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuth({
        isAuth: true,
        userData: res.data.user,
      })
    } else {
      alert('有錯誤')
    }
  }

  const checkLogin = async () => {
    const res = await axios.get('http://localhost:3005/api/auth/check-login', {
      withCredentials: true, // 從瀏覽器獲取cookie
    })

    console.log(res.data)
  }

  const logout = async () => {
    // firebase logout(注意，並不會登出google帳號)
    logoutFirebase()

    // 伺服器logout
    const res = await axios.post(
      'http://localhost:3005/api/auth/logout',
      {},
      {
        withCredentials: true, // save cookie in browser
      }
    )

    if (res.data.message === 'success') {
      setAuth({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
        },
      })
    }
  }

  return (
    <>
      <h1>google-login重定向測試頁(session-cookie)</h1>
      <p>會員狀態:{auth.isAuth ? '已登入' : '未登入'}</p>
      <button onClick={() => loginGoogleRedirect()}>
        <GoogleLogo /> 用google登入(重定向)
      </button>
      <br />
      <button onClick={logout}>登出</button>
      <br />
      <button onClick={checkLogin}>向伺服器檢查登入狀態</button>
      <hr />
    </>
  )
}
