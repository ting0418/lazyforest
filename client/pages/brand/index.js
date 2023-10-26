import React, { useState } from 'react'
import products from '@/data/camp-product.json'
import ProductMenu from '@/components/product/product-menu'
import ProductBrandIntro from '@/components/product/product-brand-intro'
import ProductRecommend from '@/components/product/product-recommend'
import ProductSliders from '@/components/product/product-sliders'

export default function BrandPage() {
  const [brand, setBrand] = useState({
    brand_id: 1,
    brand_name: 'coleman',
    brand_img: '/images/brand/brand-coleman.webp',
    brand_intro:
      '1901年美國W.C.Coleman先生製造了世界第一盞手提式氣化燈，Coleman因而誕生。百年來Coleman致力提供高品質的戶外休閒用品，帶您體驗世界領導品牌的便利和理念，點亮美好的戶外生活。',
  })
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
