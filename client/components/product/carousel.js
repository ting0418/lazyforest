import { useState, useEffect } from 'react'
import styles from '@/components/product/product-sliders.module.scss'

export default function Carousel({ product }) {
  const [thumbs, setThumbs] = useState([])
  const [imgs, setImgs] = useState([])

  console.log(product.product_img)
  useEffect(() => {
    if (product.product_img) {
      const thumbsSample = [
        `/images/products/${product.product_img}.jpeg`,
        `/images/products/${product.product_img}-1.jpeg`,
        `/images/products/${product.product_img}-2.jpeg`,
      ]

      const imgsSample = [
        `/images/products/${product.product_img}.jpeg`,
        `/images/products/${product.product_img}-1.jpeg`,
        `/images/products/${product.product_img}-2.jpeg`,
      ]

      setThumbs(thumbsSample)
      setImgs(imgsSample)
    }
  }, [product.product_img])

  if (!product.product_img) {
    // 如果 product.product_img 不存在或为空，可以返回一个 loading 状态或其他处理
    return <div>Loading...</div>
  }

  return (
    <>
      <div id="carouselProduct" className="carousel slide carousel-fade">
        <div className="d-flex flex-column mb-3 justify-content-center">
          <div className="mb-3">
            <div className="carousel-inner">
              {imgs.map((v, i) => {
                return (
                  <div
                    key={v + i}
                    className={`carousel-item ${i === 0 ? 'active' : ''}`}
                  >
                    <img
                      src={v}
                      className={`d-block w-100 ${styles.carouselImg}`}
                      alt=""
                    />
                  </div>
                )
              })}

              {/* 按鈕：前一張照片 */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselProduct"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              {/* 按鈕：下一張照片 */}
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselProduct"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* 預覽小圖 */}
          <div className="">
            <ul className="thumbnails d-flex flex-row">
              {thumbs.map((v, i) => {
                return (
                  <li key={i}>
                    <a
                      href="#"
                      type="button"
                      data-bs-target="#carouselProduct"
                      data-bs-slide-to={i}
                      className="active"
                      aria-current="true"
                      aria-label={`Slide ${i + 1}`}
                    >
                      <img
                        src={v}
                        alt={v}
                        className={`${styles.thumbnailsImg}`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
