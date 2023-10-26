// pages/[cid].js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from '@/components/camp/carousel'
import Popup from '@/components/camp/Popup'
import Calendar from '@/components/camp/Calendar'
import Reservation from '@/components/camp/Reservation'
import Comment from '@/components/camp/comment'
import styles from '@/styles/camp.module.scss'
import { useRouter } from 'next/router'
// import { useUserContext } from '@/context/UserContext'

const CampDetail = () => {
  // const {user, setUser}= useUserContext

  const [currentZoneIndex, setCurrentZoneIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(true)
  const [campData, setCampData] = useState(null)
  const router = useRouter()
  const { cid } = router.query
  const displayedZoneNames = new Set()
  const displayedZoneImg = new Set()
  const displayedImgData = new Set()
  const [isFavorited, setIsFavorited] = useState(false)

  const apiUrl = `http://localhost:3005/api/campground/${cid}`

  useEffect(() => {
    if (cid) {
      axios
        .get(apiUrl)
        .then((response) => {
          const campDataFromAPI = response.data
          setCampData(campDataFromAPI)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [apiUrl, cid])

  if (!campData) {
    return <div>Loading...</div>
  }
  const currentZone = campData.finalData[currentZoneIndex]

  //假留言資料
  const reviews = [
    {
      userAvatar:
        'https://assets.clibo.tw/images/commissions/grfpvm-06eK.jpeg?v=9324697e4e1aa1beefb0bcc06a5f7eac',
      username: 'Wang000',
      rating: 5,
      reviewContent: '這個地方很棒！漂漂亮亮～～',
      ownerReply: '感謝您的評論，歡迎再度光臨。',
      checkInDate: '2023-08-10',
      reviewDate: '2023-08-11',
    },
    {
      userAvatar:
        'https://assets.clibo.tw/images/commissions/grfpvm-06eK.jpeg?v=9324697e4e1aa1beefb0bcc06a5f7eac',
      username: 'Wang000',
      rating: 5,
      reviewContent: '這個地方很棒！漂漂亮亮～～',
      ownerReply: '感謝您的評論，歡迎再度光臨。',
      checkInDate: '2023-08-10',
      reviewDate: '2023-08-11',
    },
    {
      userAvatar:
        'https://assets.clibo.tw/images/commissions/grfpvm-06eK.jpeg?v=9324697e4e1aa1beefb0bcc06a5f7eac',
      username: 'Wang000',
      rating: 5,
      reviewContent: '這個地方很棒！漂漂亮亮～～',
      ownerReply: '感謝您的評論，歡迎再度光臨。',
      checkInDate: '2023-08-10',
      reviewDate: '2023-08-11',
    },
    {
      userAvatar:
        'https://assets.clibo.tw/images/commissions/grfpvm-06eK.jpeg?v=9324697e4e1aa1beefb0bcc06a5f7eac',
      username: 'Liao',
      rating: 5,
      reviewContent: '營主很用心～還請宵夜，太讚了吧！',
      ownerReply: '下次再一起來吃宵夜～～～',
      checkInDate: '2023-08-15',
      reviewDate: '2023-08-16',
    },
    {
      userAvatar: 'https://cdn01.pinkoi.com/product/r43zeML4/1/640x530.jpg',
      username: 'Ting',
      rating: 3,
      reviewContent: '夜景很漂亮～晚上竟然可以看到銀河？！太誇張了吧',
      ownerReply: '這裡365天都有銀河，不誇張！',
      checkInDate: '2023-08-21',
      reviewDate: '2023-08-24',
    },
    {
      userAvatar:
        'https://assets.clibo.tw/images/commissions/grfpvm-cover.jpeg?v=479afb0ebfe92955af0fc78efb99ceb5',
      username: 'yun666',
      rating: 4,
      reviewContent: '遠離塵世的喧囂，明天又要回去上班了QQ',
      ownerReply: '還是你要來我們營地上班:)',
      checkInDate: '2023-09-20',
      reviewDate: '2023-09-23',
    },
    {
      userAvatar:
        'https://assets.clibo.tw/images/commissions/cFniZm-ix1j.jpeg?v=f481ca94c5b08ddde318e3aee26ae7ee',
      username: 'Beryl001',
      rating: 3,
      reviewContent: '回去直接預約下個月啦！有夠喜歡～',
      ownerReply: '什麼下個月？！明天見啦',
      checkInDate: '2023-10-10',
      reviewDate: '2023-10-12',
    },
    {
      userAvatar: 'https://cdn01.pinkoi.com/product/G4ZSaSFL/7/640x530.jpg',
      username: 'eddie666',
      rating: 4,
      reviewContent: '好想再去森懶腰!!!',
      ownerReply: '一起森懶腰',
      checkInDate: '2023-10-22',
      reviewDate: '2023-10-13',
    },
  ]

  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0
  )

  const averageRating = Math.round(totalRating / reviews.length)

  const generateStars = () => {
    const fullStars = Math.floor(averageRating)
    const halfStar = averageRating - fullStars >= 0.5

    const stars = []

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star">
            &#9733;
          </span>
        )
      } else if (i === fullStars && halfStar) {
        stars.push(
          <span key={i} className="star">
            &#9733;&#9734;
          </span>
        )
      } else {
        stars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        )
      }
    }

    return <div>{stars}</div>
  }

  const handleDateSelect = (startDate, endDate) => {
    localStorage.setItem('startDate', startDate.toISOString())
    localStorage.setItem('endDate', endDate.toISOString())
  }

  const handleAddToCollection = () => {
    const targetId = campData.finalData[0].id
    const collectionType = 'campground'

    axios
      .put(
        `http://localhost:3005/api/campground/` + targetId,
        {}, // put 第二參數是data，這裡雖然不需要，但還是要加上空物件
        {
          withCredentials: true,
        }
      )
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
    <div className="container">
      <div className="row">
        <div className="{`${styles['photoWrapper']} col-md-6 mb-5`}">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <Carousel images={campData.finalData} />
          </div>
        </div>
        <div className={`col-md-5 ${styles.content}`}>
          <div className={styles.textContainer}>
            <div className={styles.textContent}>
              <h2>{campData.finalData[0].camp_name}</h2>
              <p>
                <a
                  className={styles.linkToGoogleMap}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    campData.finalData[0].camp_address
                  )}`}
                  target="_blank" //開新頁面
                  rel="noopener noreferrer" //好像是可以更隱私更安全啦
                >
                  {campData.finalData[0].camp_address}
                </a>
              </p>
              <p className="product-desc">{campData.finalData[0].camp_desc}</p>
            </div>
          </div>
          <div className={styles.itemContainer}>
            <div>
              <div className={styles.bookItem}>
                {showPopup && (
                  <Popup
                    zone_img={currentZone.zone_img}
                    zone_name={currentZone.zone_name}
                    zone_amount={currentZone.zone_amount}
                    zone_desc={currentZone.zone_desc}
                    zone_price={currentZone.zone_price}
                    campData={campData}
                    currentZone={currentZone}
                    displayedZoneImg={displayedZoneImg}
                  />
                )}
              </div>
              <div className={styles.likeItem}>
                <button onClick={handleAddToCollection}>
                  <i className="bi bi-suit-heart"></i>{' '}
                  {isFavorited ? '取消收藏' : '收藏'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['titleB']} col-sm-12  mt-4 `}>
        <h4 className="text-center " style={{ fontFamily: 'din-condensed' }}>
          BOOKING
        </h4>
        <h5
          className="text-center"
          style={{ fontFamily: 'Heiti-TC', color: '#a1b719' }}
        >
          立即下訂
        </h5>
      </div>
      <div className={`${styles['booking']} row mt-5col-md-6 col-sm-12`}>
        <div className="col-md-6 mb-5">
          <Calendar handleDateSelect={handleDateSelect} />
        </div>

        <div className="col-md-6">
          <table className={styles['table']}>
            <thead>
              <tr>
                <th className={styles['tableHeader']}>區域名稱</th>
                <th className={styles['tableHeader']}>剩餘帳數</th>
                <th className={styles['tableHeader']}>區域價錢</th>
              </tr>
            </thead>
            <tbody>
              {campData.finalData.map((zone, index) => {
                if (!displayedZoneNames.has(zone.zone_name)) {
                  displayedZoneNames.add(zone.zone_name)
                  return (
                    <Reservation
                      key={index}
                      zone_name={zone.zone_name}
                      zone_amount={zone.zone_amount}
                      zone_price={zone.zone_price}
                    />
                  )
                }
                return null // 如果zone_name已經顯示過，返回 null
              })}
            </tbody>
          </table>
        </div>

        {showPopup && (
          <Popup
            zone_img={currentZone.zone_img}
            zone_name={currentZone.zone_name}
            zone_amount={currentZone.zone_amount}
            zone_desc={currentZone.zone_desc}
            zone_price={currentZone.zone_price}
            campData={campData}
            currentZone={currentZone}
            displayedZoneImg={displayedZoneImg}
          />
        )}
      </div>

      <div className="row mt-5">
        <div className={`${styles['titleC']} col-sm-12 `}>
          <h4
            className="text-center mt-4"
            style={{ fontFamily: 'din-condensed' }}
          >
            COMMENT
          </h4>
          <h5
            className="text-center"
            style={{
              fontFamily: 'Heiti-TC',
              color: '#a1b719',
            }}
          >
            露友評價
          </h5>
        </div>
        <div className={`text-center ${styles['reviews']} `}>
          {generateStars()}
          <p>共 {reviews.length} 則評論</p>
        </div>
        <div
          className={`d-flex justify-content-center ${styles['commentItem']}`}
        >
          {reviews.map((review, index) => (
            <div key={index} className={`${styles['comment']} mt-2 mb-5`}>
              <Comment
                key={review.checkInDate}
                userAvatar={review.userAvatar}
                username={review.username}
                rating={review.rating}
                reviewContent={review.reviewContent}
                ownerReply={review.ownerReply}
                checkInDate={review.checkInDate}
                reviewDate={review.reviewDate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CampDetail
