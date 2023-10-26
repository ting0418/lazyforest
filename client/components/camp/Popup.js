import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '@/hooks/use-cart'
import styles from '../camp/Popup.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faAngleRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

function Popup({ campData, currentZone, displayedZoneImg }) {
  const zones = campData.finalData
  const [state, setState] = useState(false)
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const handleBookButtonClick = () => {
    const startDate = localStorage.getItem('startDate')
    const endDate = localStorage.getItem('endDate')

    if (!startDate || !endDate) {
      // 如果 startDate 或 endDate 不存在，显示错误消息
      Swal.fire({
        icon: 'info',
        title: '請先選擇入住日期及退房日期',
      })
    } else {
      // 显示 Popup 内容
      setState(true)
    }
  }

  const handleContainerClick = (e) => {
    if (e.target.classList.contains('wrap')) {
      setState(false)
    }
  }
  if (!displayedZoneImg) {
    return (
      <div className={styles.root}>
        <button onClick={() => setState(!state)}>立即訂位</button>
      </div>
    )
  }

  if (displayedZoneImg.has(currentZone.zone_img)) {
    return null // 如果已经显示过，不显示弹出窗口
  }

  const showNextZone = () => {
    let nextIndex = currentZoneIndex + 1
    if (nextIndex >= zones.length) {
      nextIndex = 0 // 回到第一張
    }
    while (zones[nextIndex].zone_name === displayedZone.zone_name) {
      nextIndex = (nextIndex + 1) % zones.length // 跳過相同區域
    }
    setCurrentZoneIndex(nextIndex)
  }

  const showPrevZone = () => {
    let prevIndex = currentZoneIndex - 1
    if (prevIndex < 0) {
      prevIndex = zones.length - 1 // 回到最後一張
    }
    while (zones[prevIndex].zone_name === displayedZone.zone_name) {
      prevIndex = (prevIndex - 1 + zones.length) % zones.length // 跳過相同區域
    }
    setCurrentZoneIndex(prevIndex)
  }

  const displayedZone = zones[currentZoneIndex]

  //寫到local storage
  const camp = () => {
    const existingData = localStorage.getItem('reservationData')
    // const startDate = new Date(localStorage.getItem('startDate'))
    // const endDate = new Date(localStorage.getItem('endDate'))
    // const existingStartDate = localStorage.getItem('startDate');
    // const existingEndDate = localStorage.getItem('endDate');
    let reservations = []

    if (existingData) {
      reservations = JSON.parse(existingData)
    }

    const newReservation = {
      camp_id: campData.finalData[0].id,
      camp_name: campData.finalData[0].camp_name,
      // camp_img: campData.finalData[0].camp_img,
      camp_img: `/images/camp_img/${campData.finalData[0].camp_img}`,
      camp_address: campData.finalData[0].camp_address,
      zone_id: displayedZone.zone_id,
      zone_name: displayedZone.zone_name,
      // zone_img: displayedZone.zone_img,
      zone_img: `/images/camp_img/${displayedZone.zone_img}`,
      zone_price: displayedZone.zone_price,
      quantity: 1,
    }

    // const updatedReservations = [
    //   startDate.toISOString().split('T')[0],
    //   endDate.toISOString().split('T')[0],
    //   { ...newReservation },
    // ];

    // 检查是否存在相同的預訂
    const existingReservation = reservations.find(
      (reservation) =>
        reservation.camp_id === newReservation.camp_id &&
        reservation.zone_id === newReservation.zone_id
    )

    if (existingReservation) {
      existingReservation.quantity += 1
      Swal.fire({
        icon: 'success',
        title: '成功加入行程',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      reservations.push(newReservation)
      localStorage.setItem('reservationData', JSON.stringify(reservations))
      Swal.fire({
        icon: 'success',
        title: '成功加入行程',
        showConfirmButton: false,
        timer: 1500,
      })
    }

    localStorage.setItem('reservationData', JSON.stringify(reservations))
  }

  //收藏
  const handleAddToCollection = () => {
    const targetId = campData.finalData[0].id
    const collectionType = 'campground'

    axios
      .put(`http://localhost:3005/api/campground/` + targetId)
      .then((response) => {
        if (response.data.message === 'success') {
          if (isFavorited) {
            console.log('取消收藏成功')
            setIsFavorited(false)
          } else {
            console.log('收藏成功')
            setIsFavorited(true)
          }
        } else {
          console.log('操作失败')
        }
      })
      .catch((error) => {
        console.error('Error adding/removing from collection:', error)
      })
  }

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.bookingButton}>
          <button onClick={handleBookButtonClick}>立即訂位</button>
        </div>
        <div
          className={`wrap ${state ? 'active' : ''}`}
          onClick={handleContainerClick}
          onKeyDown={handleContainerClick}
          role="button"
          tabIndex={0}
        >
          <div>
            <div className={styles.Card}>
              <div className={styles.closeButton}>
                <button onClick={() => setState(false)}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>

              <img
                src={`/images/camp_img/${displayedZone.zone_img}`}
                alt={displayedZone.zone_name}
              />

              <div className={styles.PrevNext}>
                <button onClick={showPrevZone} className={styles.nextButton}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h2>{displayedZone.zone_name}</h2>
                <button onClick={showNextZone} className={styles.nextButton}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
              <p>{displayedZone.zone_desc}</p>
              <div className={styles.buttonContainer}>
                <button onClick={camp}>預訂此區</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
