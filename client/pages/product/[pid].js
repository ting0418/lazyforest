import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/use-cart'
import { useUserContext } from '@/context/UserContext'
import Title from '@/components/product/title'
import Carousel from '@/components/product/carousel'
import products from '@/data/camp-product.json'
import brandData from '@/data/product/brand.json'
import ProductRecommend from '@/components/product/product-recommend'
import ProductCounter from '@/components/product/product-counter'
import ProductMenu from '@/components/product/product-menu'
import ProductBrandIntro from '@/components/product/product-brand-intro'
import ProductFavPid from '@/components/product/product-fav-in-pid'
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function Detail() {
  const { addItem } = useCart()
  const swalAddCart = () => {
    Swal.fire({
      timer: 1000,
      title: `已加入${counterQuantity}個商品購物車`,
      text: '繼續看看其他商品吧！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  const { favorites, setFavorites } = useUserContext()
  const handleTriggerFav = (id) => {
    // 在陣列中->移出，不在陣列中加入
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((v) => v !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const router = useRouter()
  const [product, setProduct] = useState({
    id: null,
    product_name: '',
    product_img: '',
    product_introduce: '',
    product_spec: {},
    product_price: null,
    product_amount: null,
    product_discount: null,
    category_id: null,
    created_at: '',
    updated_at: '',
    Valid: 0,
  })
  const [brand, setBrand] = useState({
    brand_id: null,
    brand_name: '',
    brand_img: '',
    brand_intro: '',
  })
  //信號狀態，控制載入動畫出現與關閉
  const [isLoading, setIsLoading] = useState(true)

  const productItem = async (pid) => {
    //打開載入動畫
    setIsLoading(true)
    try {
      // 發送 HTTP 請求獲取商品詳細資訊
      const res = await fetch('http://localhost:3005/api/products/' + pid)
      const data = await res.json()
      data.product_spec = JSON.parse(JSON.parse(data.product_spec))
      setProduct(data) // 將獲取的資訊設定到 product 狀態中

      const matchingBrand = brandData.find(
        (brandItem) => brandItem.brand_id === data.brand_id
      )
      if (matchingBrand) {
        setBrand(matchingBrand)
      }
    } catch (e) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      alert('伺服器連線失敗')
    }
  }

  useEffect(() => {
    if (product.id) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [product])

  useEffect(() => {
    if (router.isReady) {
      if (!isLoading) setIsLoading(true)

      //確保能得到 router.query 有值了
      const { pid } = router.query
      console.log(pid)
      productItem(pid)
    }
  }, [router.isReady, router.query])

  const [counterQuantity, setCounterQuantity] = useState(1)
  const handleCounterChange = (newQuantity) => {
    setCounterQuantity(newQuantity)
  }

  const selectedProduct = {
    id: product.id,
    img: `/images/products/${product.product_img}.jpeg`,
    quantity: counterQuantity,
    name: product.product_name,
    price: product.product_price,
  }

  return (
    <>
      <Title />
      <ProductMenu />

      <div className="container row mt-5 gx-5 mx-auto">
        <div className="col-sm-6">
          <div className="position-sticky" style={{ top: '2rem' }}>
            {/* 商品照 */}
            <Carousel product={product} />
          </div>
        </div>
        {/* 商品名稱和介紹 */}
        <div className="product-intro col-sm-6 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="product-title text-dark">
                {product.product_name}
              </h4>
              <ProductFavPid
                product={product}
                id={product.id}
                handleTriggerFav={handleTriggerFav}
              />
            </div>

            <p className="product-desc text-secondary">
              {product.product_introduce}
            </p>
            {/* 判斷是否為新商品去展示 new 標籤 {v.updated_at } */}
            <span className={`badge text-dark cardBadge-new`}>New</span>
            {product.product_discount === 1 ? null : (
              <span className={`badge text-dark cardBadge-discount`}>
                {Math.floor((100 - product.product_discount * 100).toFixed(2))}
                %off
              </span>
            )}
          </div>
          {/* 購買表單 */}
          <form className="checkoutForm">
            <div className="d-flex justify-content-between mb-3">
              <div className="h5 product-price">
                NT$ {product.product_price}
              </div>
              <ProductCounter handleCounterChange={handleCounterChange} />
            </div>
            <div className="d-flex mb-2">
              <button
                className="addCartBtn btn btn-secondary w-100 me-2 text-light"
                onClick={() => {
                  addItem(selectedProduct)
                  swalAddCart()
                }}
                type="button"
              >
                加入購物車
              </button>
              <button
                className="checkoutBtn btn w-100"
                type="button"
                onClick={() => {
                  addItem(selectedProduct)
                }}
              >
                <Link className="buyBtn" href="/cart">
                  直接購買
                </Link>
              </button>
            </div>
          </form>
        </div>
        {/* 商品規格詳細說明 */}
        <div className="row mx-auto productDetail">
          <div className="col-sm-12">
            <div className="specContainer">
              <div className="bg-dark tableHead"></div>
              <div className="p-5 productSpec">
                <table className="table-light">
                  <tbody className="">
                    {Object.entries(product.product_spec).map(
                      ([key, value], index) => (
                        <tr className="border-bottom" key={index}>
                          <td className="py-3 pe-4 specTitle align-bottom">
                            {key}
                          </td>
                          <td className="py-3 specContent">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-5 productSpecMobile">
                <table className="table-light">
                  <tbody className="">
                    {Object.entries(product.product_spec).map(
                      ([key, value], index) => (
                        <div className="border-bottom" key={index}>
                          <tr className="specTitle">{key}</tr>
                          <tr className="specContent">{value}</tr>
                        </div>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* 區塊標題 - BRAND */}
        <div className="text-center">
          <h2 className="sectionTitle-eng text-dark">BRAND</h2>
          <h5 className="sectionTitle-ch text-info">關於品牌</h5>
        </div>
        <section className="my-5">
          <ProductBrandIntro brand={brand} />
        </section>
        {/* 區塊標題 - SEE MORE */}
        <div className="text-center">
          <h2 className="sectionTitle-eng text-dark">SEE MORE</h2>
          <h5 className="sectionTitle-ch text-info">你可能也喜歡</h5>
        </div>
        {/* 推薦商品 */}
        <section className="my-5">
          <ProductRecommend products={products} />
        </section>
      </div>
    </>
  )
}
