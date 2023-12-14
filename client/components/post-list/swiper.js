// 例如，Swiper 輪播組件可以獨立成一個文件
// SwiperComponent.js
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import styles from './post-list.module.scss'
const SwiperComponent = () => {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      effect={'fade'}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className={`${styles.swiper}`}
    >
      <SwiperSlide className={`${styles.swiperslide}`}>
        <img src="/images/cover1.jpg" />
      </SwiperSlide>
      <SwiperSlide className={`${styles.swiperslide}`}>
        <img src="/images/cover2.jpg" />
      </SwiperSlide>
      <SwiperSlide className={`${styles.swiperslide}`}>
        <img src="/images/cover3.jpg" />
      </SwiperSlide>
    </Swiper>
  )
}

export default SwiperComponent
