import React, { createContext, useContext, useEffect, useState } from 'react'
import { functions } from 'lodash'
import axios from 'axios'

export const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '' })
  // 我的最愛清單使用
  const [favorites, setFavorites] = useState([])

  // 得到我的最愛
  const getFavorites = async () => {
    const res = await axios.get(
      'http://localhost:3005/api/favorite/my-favorite',
      {
        withCredentials: true,
      }
    )

    if (res.data.favorites) {
      setFavorites(res.data.favorites)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])
  async function checkLogin() {
    const resp = await fetch('http://localhost:3005/api/auth/check-login', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include', // save cookie in browser
    })
    const data = await resp.json()
    console.log({ action: 'check-login', data: data })
    if (data.message !== 'Unauthorized') {
      setUser(data.user)
      // 成功登入後要執行一次向伺服器取得我的最愛清單
      getFavorites()
    } else {
      setUser({ name: 'Guest' })
      // 登出時要設回空陣列
      setFavorites([])
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, favorites, setFavorites }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
