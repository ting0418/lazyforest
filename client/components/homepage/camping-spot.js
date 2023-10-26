import React, { useCallback, useEffect, useState } from 'react'
import styles from '@/components/homepage/camping-spot.module.scss'
import campingSpot from '@/data/homepage/camping-spot.json'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import data from '@/data/homepage/weather-camp.json'

import {
  FaCloud,
  FaCloudMoonRain,
  FaCloudRain,
  FaSun,
  FaWind,
  FaUmbrella,
} from 'react-icons/fa'
import axios from 'axios'

export default function Campingspot() {
  // 呼叫api之資料
  const [weatherData, setWeatherData] = useState([
    {
      endTime: '',
      startTime: '',
      elementValue: [
        {
          measures: '',
          value: '',
        },
      ],
    },
  ])
  // 整理完的資料儲存
  const [finalWeather, setFinalWeather] = useState([])

  useEffect(() => {
    const weatherurl = axios
      .get(
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-A3CE09F7-A4F2-4727-8128-E321CD2DE09A&limit=30&format=JSON'
      )
      .then((response) => {
        console.log('response', response.data, response.data.records)
        setWeatherData(
          response.data.records.locations[0].location[13].weatherElement[0].time
        )
        console.log('response', response.data, response.data.records)
        setWeatherData(
          response.data.records.locations[0].location[13].weatherElement[0].time
        )
        return
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    console.log('weatherData', weatherData)
    console.log('calculateWeather', calculateWeather())
  }, [weatherData])

  const calculateWeather = useCallback(() => {
    // map 物件陣列
    const test = weatherData.map((v) => {
      const date = new Date(v.startTime) // 将日期字符串解析为日期对象
      const month = date.getMonth() + 1 // 获取月份（注意：月份从0开始，所以要加1）
      const day = date.getDate() // 获取日期
      const formattedDate = `${month} 月 ${day} 日` // 格式化日期字符串

      const newObj = {
        // date: v.startTime.slice(0, 10),
        date: formattedDate,

        persent:
          v.elementValue[0].value === ' ' || v.elementValue[0].value === ''
            ? '0'
            : v.elementValue[0].value,
      }
      return newObj
    })
    const newArr = []
    const processedDates = new Set()
    test.forEach((v, i) => {
      // 1.找自己本身
      console.log('test2', v, i)
      if (!processedDates.has(v.date)) {
        // 找出所有跟他一樣的
        const findSameDate = test.filter((o) => o.date === v.date)
        // 若有找到同日期，則加總除計算
        if (findSameDate.length > 1) {
          const avg =
            findSameDate
              .map((v) => parseInt(v.persent))
              .reduce((a, b) => a + b) / findSameDate.length
          // console.log('avg', avg)

          const finalObj = {
            date: v.date,
            percent: String(avg),
          }
          newArr.push(finalObj)
          processedDates.add(v.date)
        } else {
          newArr.push(v)
        }
      }
      // setFinalWeather(newArr)
      // console.log("newArr", newArr);
    })
    return newArr
  }, [weatherData])

  const weatherImg = useCallback((v) => {
    if (v === 0 || v === '0') {
      return (
        <>
          <FaSun className={`${styles.weatherIcon}`} />
        </>
      )
    }
    if (v > 0) {
      return (
        <>
          <FaCloudMoonRain className={`${styles.weatherIcon}`} />
        </>
      )
    }
    if (v > 0 && v <= 30) {
      return (
        <>
          <FaCloud className={`${styles.weatherIcon}`} />
        </>
      )
    }
    if (v > 100) {
      return (
        <>
          <FaCloudRain className={`${styles.weatherIcon}`} />
        </>
      )
    } else {
      // 添加其他條件的圖標選擇
      // 示例：如果有風
      return <FaWind className={`${styles.weatherIcon}`} />
    }
  })

  // get current index
  const [activeIndex, setActiveIndex] = useState(0)
  const [areaName, setAreaName] = useState('')

  useEffect(() => {
    // get address
    const addressNow = campingSpot[activeIndex].camp_address
    console.log(addressNow, data, activeIndex)

    //search weather
    let finalWeatherArray = []

    for (const [key, value] of Object.entries(data)) {
      if (addressNow.includes(key)) {
        finalWeatherArray = value
        setAreaName(key)
      }
    }

    //console.log(finalWeatherArray)

    // set final weather
    setFinalWeather(finalWeatherArray)
  }, [activeIndex])

  return (
    <>
      {/* 桌機版 */}
      <div className={`${styles.container} d-none d-md-flex`}>
        <div className={`${styles.word}`}>
          <p className={`${styles.p1}`}>CAMPING SPOT</p>
          <p className={`${styles.p2}`}>最新營位</p>
        </div>

        {/* CARD */}
        <div className={`${styles.cardContainer}`}>
          {/* mySwiper  */}
          <Swiper
            modules={[Navigation]}
            // navigation={{ nextEl: '.nextArrow', prevEl: '.prevArrow' }}
            loop={true}
            slidesPerView={'2'}
            spaceBetween={120}
            // onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
          >
            {campingSpot.map((v, i) => (
              <SwiperSlide key={i}>
                <div className={`row ${styles.conponent} mx-5`}>
                  <div className={`col ${styles.image} mx-3 `}>
                    <img
                      className={`${styles.image}`}
                      src={v.camp_img}
                      alt="camp"
                    />
                  </div>
                  <div className={`col ${styles.campsite}`}>
                    <h1>{v.camp_name}</h1>
                    <div className="d-flex pt-3">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '20px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.text}`}>{v.camp_address}</p>
                    </div>
                    <div className="d-flex">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '20px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.text}`}>{v.camp_altitude}</p>
                    </div>
                    <div className="d-flex ">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '20px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.text}`}>{v.camp_lastRes}</p>
                    </div>
                    <div className="d-flex">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '20px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.text}`}>{v.camp_openRes}</p>
                    </div>
                    <div className="d-flex">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '20px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.text}`}>{v.camp_dayoff}</p>
                    </div>
                    <div className="badge d-flex">
                      <span className={`${styles.customSpan}`}>
                        {v.camp_type}
                      </span>
                      <span className={`${styles.customSpan}`}>
                        {v.camp_type2}
                      </span>
                      <span className={`${styles.customSpan}`}>
                        {v.camp_type3}
                      </span>
                    </div>
                    <button
                      className={`${styles.forecast}`}
                      onClick={() => setActiveIndex(i)}
                    >
                      看一周天氣預報
                    </button>
                    <Link
                      href={`/camp/${v.camp_id}`}
                      className="d-flex justify-content-end text-decoration-none"
                    >
                      <p className={`${styles.link} mt-2 me-2`}> 
                        <span className={`${styles.viewMore}`}>VIEW MORE</span>
                      </p>
                      <p
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '30px', color: '#d1ef1a' }}
                      ></p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 天氣 */}
        <div className={`${styles.weather}`}>
          <h2>未來一週營區天氣</h2>
          {/* // Eddy -start */}
          <p className={`${styles.location}`}>{areaName}</p>
          {/* // Eddy -end */}
        </div>

        <div className="d-flex mb-5 align-items-center">
          {finalWeather.map((v, i) => {
            return (
              <>
                <a
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '30px',
                  }}
                  className={`${styles.weatherBox} ml-3`}
                >
                  <p className={`${styles.weatherp}`}>{v.date}</p>
                  {weatherImg(v.percent)}
                </a>
              </>
            )
          })}
        </div>
      </div>
      {/* 手機版 */}
      <div className={`${styles.containerPh} d-block d-md-none`}>
        <div className={`${styles.word} pb-0`}>
          <p className={`${styles.p1Ph}`}>CAMPING SPOT</p>
          <p className={`${styles.p2Ph}`}>最新營位</p>
        </div>
        {/* CARD */}
        <div className={`${styles.cardContainer} px-3`}>
          {/* mySwiper  */}
          <Swiper
            // navigation
            modules={[Navigation]}
            loop={true}
            slidesPerView={'1'}
          >
            {campingSpot.map((v, i) => (
              <SwiperSlide key={i}>
                <div className="border rounded p-2">
                  <div className="ms-4">
                    <img
                      className={`${styles.mobilepic}`}
                      src={v.camp_img}
                      alt="camp"
                    />
                  </div>
                  <div className={` ${styles.campsitePh}`}>
                    <h1 className="py-2 pt-3">{v.camp_name}</h1>
                    <div className="d-flex ps-2">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '11px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.textPh}`}>{v.camp_address}</p>
                    </div>
                    <div className="d-flex ps-2">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '11px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.textPh}`}>{v.camp_altitude}</p>
                    </div>
                    <div className="d-flex ps-2">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '11px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.textPh}`}>{v.camp_lastRes}</p>
                    </div>
                    <div className="d-flex ps-2">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '11px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.textPh}`}>{v.camp_openRes}</p>
                    </div>
                    <div className="d-flex ps-2">
                      <i
                        className="bi bi-arrow-right-circle-fill"
                        style={{ fontSize: '11px', color: '#FEFFF6' }}
                      ></i>
                      <p className={`${styles.textPh}`}>{v.camp_dayoff}</p>
                    </div>

                    <div className="d-flex">
                      {/* hashtag */}
                      <div className="badge d-flex pt-2">
                        <span className={`${styles.customSpanPh}`}>
                          {v.camp_type}
                        </span>
                        <span className={`${styles.customSpanPh}`}>
                          {v.camp_type2}
                        </span>
                        <span className={`${styles.customSpanPh}`}>
                          {v.camp_type3}
                        </span>
                        {/* VIEW MORE */}
                      </div>
                      <Link
                        href={`/camp/${v.camp_id}`}
                        className={`${styles.linkPh} ms-auto d-flex`}
                      >
                        <p className={`${styles.link}`}>
                          <span className={`${styles.viewMore} mt-2 me-2`}>VIEW MORE</span>
                        </p>
                        <p
                          className="bi bi-arrow-right-circle-fill m-0"
                          style={{ fontSize: '20px', color: '#d1ef1a' }}
                        ></p>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 天氣 */}
        <div className={`${styles.weatherPh}`}>
          <h2>一週天氣</h2>
          <p className={`${styles.locationPh}`}>桃園復興區</p>
        </div>
        <div className="d-flex mt-5 align-items-center">
          {finalWeather.slice(0, 4).map((v, i) => (
            <a
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: ' 20px 10px',
              }}
              className={`${styles.weatherBox} ml-3`}
              key={i}
            >
              <p className={`${styles.weatherp}`}>{v.date}</p>
              {weatherImg(v.percent)}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
