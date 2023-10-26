import { useState, useEffect } from 'react'
import ProductCard from '@/components/fav-test/product-card'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const { authJWT } = useAuthJWT()

  const getProducts = async () => {
    const res = await axios.get(
      'http://localhost:3005/api/favorite/all-products',
      {
        withCredentials: true,
      }
    )

    if (res.data.products) {
      setProducts(res.data.products)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const triggerFav = (products, id) => {
    return products.map((v, i) => {
      if (v.id === id) return { ...v, is_favorite: !v.is_favorite }
      return { ...v }
    })
  }

  const handleTriggerFav = (id) => {
    setProducts(triggerFav(products, id))
  }

  // 未登入時，會出現請先登入的內容
  if (!authJWT.isAuth)
    return (
      <>
        <p>需要先登入</p>
        <Link href="/user-test/jwt">登入</Link>
      </>
    )

  return (
    <>
      <Link href="/user-test/jwt">登入</Link>
      <ul>
        {products.map((v) => {
          return (
            <ProductCard
              key={v.id}
              id={v.id}
              name={v.name}
              price={v.price}
              is_favorite={v.is_favorite}
              handleTriggerFav={handleTriggerFav}
            />
          )
        })}
      </ul>
    </>
  )
}
