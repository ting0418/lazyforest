import { useState, useEffect } from 'react'
import ProductCard from '@/components/fav-test2/product-card'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const { favorites, setFavorites } = useAuthJWT()

  const getProducts = async () => {
    const res = await axios.get(
      'http://localhost:3005/api/favorite/all-products-no-login',
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

  const handleTriggerFav = (id) => {
    // 在陣列中->移出，不在陣列中加入
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((v) => v !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

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
              handleTriggerFav={handleTriggerFav}
            />
          )
        })}
      </ul>
    </>
  )
}
