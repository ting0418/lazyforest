import React from 'react'
import Header from '@/components/homepage/header'
import Campingspot from '@/components/homepage/camping-spot'
import Aside from '@/components/homepage/aside'
import products from '@/data/camp-product.json'
// import Footer from '@/components/homepage/footer'
import styles from '@/components/layout/default-layout/layout.module.scss'
import ProductSliders from '@/components/product/product-sliders'
import Communicate from '@/components/homepage/communicate'
import CampinGear from '@/components/homepage/camping-gear'
// import Head from '@/components/homepage/head'

export default function Index() {
  return (
    <div>
      <Header />
      <Campingspot />
      <div className={`${styles.ProductSliders} d-none d-md-block`}>
        <p
          style={{
            fontSize: '64px',
            color: '#3E3B35',
            fontFamily: 'din-condensed',
            textAlign: 'center',
            paddingTop: '96px',
          }}
        >
          SHOPPING
        </p>
        <p
          style={{
            fontSize: '24px',
            fontFamily: 'din-condensed',
            color: '#A1B719',
            fontWeight: '600',
            textAlign: 'center',
            paddingBottom: '30px',
          }}
        >
          人氣裝備
        </p>
      </div>
      <div className="mt-5">
        <ProductSliders products={products} />
      </div>
      <div className="mt-5">
        <Communicate />
      </div>
      <CampinGear />
    </div>
  )
}
