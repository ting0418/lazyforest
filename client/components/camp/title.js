import React from 'react'
import styles from '../../components/camp/Title.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import './styles.css'

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
export default function Title() {
  return (
    <>
      <h1 className={`${styles.title}`}>BOOK CAMPING｜營地預約</h1>
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={'fade'}
        // navigation={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
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
    </>
  )
}
