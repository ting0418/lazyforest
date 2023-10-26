import React from 'react'
import styles from '@/components/product/product-recommend.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
// import Swiper core and required modules
import {
  EffectCoverFlow,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-coverflow'

export default function ProductRecommend({ products }) {
  const filterProduct = products.slice(0, 8)
  return (
    <>
      <Swiper
        className={`${styles.swiperContainer}`}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation={{ nextEl: '.nextArrow', prevEl: '.prevArrow' }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // slidesPerView={4}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 0, modifier: 2.5 }}
        spaceBetween={50}
        // navigation
        // pagination={{ clickable: true }}
        breakpoints={{
          1920: {
            slidesPerView: 4,
          },
          390: {
            slidesPerView: 2,
          },
        }}
        // navigation={{ nextEl: '.nextArrow', prevEl: '.prevArrow' }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        <div class={`${styles.swiperPrevBtn} prevArrow`}>
          <i
            className={`${styles.slideIcon} bi bi-arrow-left-circle-fill`}
            style={{ color: '#d1ef1a', fontSize: '50px' }}
          ></i>
        </div>
        <div class={`${styles.swiperNextBtn} nextArrow`}>
          <i
            className={`bi bi-arrow-right-circle-fill`}
            style={{ color: '#d1ef1a', fontSize: '50px' }}
          ></i>
        </div>
        {/* <div className={`${styles.cardContainer}`}></div> */}
        {filterProduct.map((v) => {
          return (
            <>
              <SwiperSlide>
                {/* CARD */}
                <Link
                  href={`/product/${v.product_id}`}
                  className={`${styles.linkUnstyled}`}
                >
                  <div key={v.id} className={` ${styles.card}`}>
                    <img
                      className={`${styles.cardImg}`}
                      src={v.product_img}
                      alt="tent"
                    />
                    {/* BODY */}
                    <div className={` ${styles.cardBody}`}>
                      <h4 className={`${styles.cardTitle} my-0`}>
                        {v.product_name}
                      </h4>
                      <h3 className={`${styles.cardPrice} my-0`}>
                        NT$ {v.product_price}
                      </h3>
                      {v.product_discount === 1 ? null : (
                        <h5 className={`${styles.cardDelPrice} my-0`}>
                          NT$ {v.product_price}
                        </h5>
                      )}
                      <div className={` ${styles.productTags}`}>
                        {/* 判斷是否為新商品去展示 new 標籤 {v.updated_at } */}
                        <span className={`badge text-dark ${styles.cardBadge}`}>
                          New
                        </span>
                        {v.product_discount === 1 ? null : (
                          <span
                            className={`badge text-dark ${styles.cardBadge}`}
                          >
                            {100 - v.product_discount * 100}%off
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            </>
          )
        })}
      </Swiper>
    </>
  )
}
