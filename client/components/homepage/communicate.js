import React from 'react'
import styles from '@/components/homepage/communicate.module.scss'
import { FaCommentAlt, FaGripfire } from 'react-icons/fa'
import communicate from '@/data/homepage/communicate.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'

export default function Communicate() {
  return (
    <>
      {/* 桌機版 */}
      <div className={`${styles.container} d-none d-md-block`}>
        <div className={`${styles.communicate}`}>
          <p className={`${styles.text1}`}>COMMUNICATE</p>
          <p className={`${styles.text2}`}>討論區</p>
        </div>
        {/* CARD */}
        <div className={`${styles.cardContainer} `}>
          {/* mySwiper  */}
          <Swiper
            // navigation={true}
            modules={[Navigation]}
            loop={true}
            slidesPerView={'3'}
            spaceBetween={120}
          >
            {communicate.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link
                    className="text-decoration-none"
                    href={`/forum/${v.id}`}
                  >
                    <div className={`${styles.cards} mx-5`}>
                      <div className={`${styles.card1}`}>
                        <p className={`${styles.cardP}`}>{v.title}</p>
                        <p className={`${styles.cardP2}`}>{v.forum_dt}</p>
                        <div className={`${styles.cardImg}`}>
                          <img
                            className={`${styles.image}`}
                            src={v.forum_img}
                            alt=""
                          />
                        </div>
                        <div>
                          <div
                            className={`${styles.cardP3} text-wrap px-5 py-3`}
                          >
                            {v.content}
                          </div>
                        </div>
                        <div className="d-flex">
                          <button
                            className={`${styles.btn1} d-flex align-items-center justify-content-center`}
                          >
                            <div className="d-flex align-items-center">
                              <FaCommentAlt />
                              <p className="mb-0 p-2">{v.message}</p>
                            </div>
                          </button>
                          <button
                            className={`${styles.btn2} d-flex align-items-center justify-content-center`}
                          >
                            <div className="d-flex align-items-center">
                              <FaGripfire />
                              <p className="mb-0 p-2">{v.like}</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
      {/* 手機版 */}
      <div className={`${styles.container} d-block d-md-none pb-5`}>
        <div className={`${styles.communicatePh} pb-3`}>
          <p className={`${styles.text1Ph}`}>COMMUNICATE</p>
          <p className={`${styles.text2Ph}`}>討論區</p>
        </div>
        {/* CARD */}
        <div className="">
          {/* mySwiper  */}
          <Swiper
            // navigation={true}
            modules={[Navigation]}
            loop={true}
            slidesPerView={'1'}
          >
            {communicate.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className={`${styles.cards} ms-5 ps-3`}>
                    <div className={`${styles.card1Ph}`}>
                      <p className={`${styles.cardPPh}`}>{v.title}</p>
                      <p className={`${styles.cardP2Ph}`}>{v.forum_dt}</p>
                      <div className={`${styles.cardImgPh}`}>
                        <img
                          className={`${styles.imagePh}`}
                          src={v.forum_img}
                          alt=""
                        />
                      </div>
                      <div>
                        <div
                          className={`${styles.cardP3Ph} text-wrap px-3 pt-1`}
                        >
                          {v.content}
                        </div>
                      </div>
                      <div className="d-flex">
                        <button
                          className={`${styles.btn1Ph} d-flex align-items-center justify-content-center`}
                        >
                          <div className="d-flex align-items-center">
                            <FaCommentAlt />
                            <p className="mb-0 p-1">{v.message}</p>
                          </div>
                        </button>
                        <button
                          className={`${styles.btn2Ph} d-flex align-items-center justify-content-center`}
                        >
                          <div className="d-flex align-items-center">
                            <FaGripfire />
                            <p className="mb-0 p-1">{v.like}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </>
  )
}
