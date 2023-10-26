import React, { useState } from 'react'
import styles from '../camp/carousel.module.scss'

const baseUrl = '/images/camp_img/'

export default function PhotoGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const uniqueImages = Array.from(
    new Set(images.map((image) => image.img_data))
  )

  const limitedImages = uniqueImages.slice(0, 3)

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? limitedImages.length - 1 : prevIndex - 1
    )
  }

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === limitedImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className={styles['photo-gallery']}>
      <div className={styles['main-photo']}>
        <img
          src={baseUrl + limitedImages[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
        />
        <button className={styles['prev-button']} onClick={handlePrevClick}>
          &lt;
        </button>
        <button className={styles['next-button']} onClick={handleNextClick}>
          &gt;
        </button>
      </div>
      <div className={styles['thumbnails']}>
        <div className={styles['thumbnail-list']}>
          {uniqueImages.map((imgData, index) => {
            //不重複渲染相同圖片
            return (
              <div
                key={index}
                className={`${styles['thumbnail']} ${
                  index === activeIndex ? styles['active'] : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={baseUrl + imgData} alt={`Thumbnail ${index + 1}`} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
