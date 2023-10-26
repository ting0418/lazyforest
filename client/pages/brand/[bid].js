import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import products from '@/data/camp-product.json'
import ProductMenu from '@/components/product/product-menu'
import ProductBrandIntro from '@/components/product/product-brand-intro'
import ProductRecommend from '@/components/product/product-recommend'
import ProductSliders from '@/components/product/product-sliders'

export default function BrandPage() {
  const router = useRouter()
  const [brand, setBrand] = useState({
    brand_id: 1,
    brand_name: 'coleman',
    brand_img: '/images/brand/brand-coleman.webp',
    brand_intro:
      '1901年美國W.C.Coleman先生製造了世界第一盞手提式氣化燈，Coleman因而誕生。百年來Coleman致力提供高品質的戶外休閒用品，帶您體驗世界領導品牌的便利和理念，點亮美好的戶外生活。',
  })

  const brandItem = async (pid) => {
    //打開載入動畫
    try {
      // 發送 HTTP 請求獲取商品詳細資訊
      const res = await fetch('http://localhost:3005/api/products/brand/' + pid)
      const data = await res.json()
      setBrand(data) // 將獲取的資訊設定到 product 狀態中
    } catch (e) {
      alert('伺服器連線失敗')
    }
  }
  useEffect(() => {
    if (router.isReady) {
      //確保能得到 router.query 有值了
      const { bid } = router.query
      console.log(bid)
      brandItem(bid)
    }
  }, [router.isReady, router.query])

  return (
    <>
      <ProductMenu />
      {/* 區塊標題 - BRAND */}
      <div className="container">
        <div className="text-center sectionTitle">
          <h2 className="sectionTitle-eng text-dark">BRAND</h2>
          <h5 className="sectionTitle-ch text-primary">品牌介紹</h5>
        </div>
        <section className="my-5">
          <ProductBrandIntro brand={brand} />
        </section>
        {/* 區塊標題 - CHOICE */}
        <div className="text-center sectionTitle">
          <h2 className="sectionTitle-eng text-dark">BEST CHOICE</h2>
          <h5 className="sectionTitle-ch text-primary">精選商品</h5>
        </div>
        {/* 幻燈片 */}
        <section className="d-flex justify-content-cemter align-items-center">
          <ProductSliders products={products} />
        </section>
        {/* 區塊標題 - DISCOUNT */}
        <div className="text-center sectionTitle">
          <h2 className="sectionTitle-eng text-dark">DISCOUNT</h2>
          <h5 className="sectionTitle-ch text-primary">特價優惠中</h5>
        </div>
        {/* 推薦商品 */}
        <section className="">
          <ProductRecommend products={products} />
        </section>
      </div>
    </>
  )
}
