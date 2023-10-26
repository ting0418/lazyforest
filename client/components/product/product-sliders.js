import React, { useState } from 'react'
import styles from '@/components/product/product-sliders.module.scss'
import Link from 'next/link'

export default function ProductSliders({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const nextIndex = (currentIndex + 1) % products.length
  const prevIndex = (currentIndex - 1 + products.length) % products.length

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={`col-sm-5 ${styles.slideContent}`}>
            <h4 className={`${styles.title}`}>
              {products[currentIndex].product_name}
            </h4>
            <p className={`${styles.intro}`}>
              {products[currentIndex].product_introduce}
            </p>
            <div className="d-flex">
              <h4 className={`${styles.price}`}>
                NT${' '}
                {parseInt(
                  products[currentIndex].product_price *
                    products[currentIndex].product_discount
                )}
              </h4>
              {products[currentIndex].product_discount === 1 ? null : (
                <h5 className={`my-0 ${styles.priceDel}`}>
                  NT$ {products[currentIndex].product_price}
                </h5>
              )}
            </div>
          </div>
          <div className="col-sm-7">
            <div className="row">
              {/* 現在的圖片 */}
              <div className={`col-7 ${styles.slideContainer}`}>
                <Link href={`/product/${products[currentIndex].product_id}`}>
                  <img
                    className={` ${styles.slideImg} ${styles.slideCurrentImg}`}
                    src={products[currentIndex].product_img}
                    alt=""
                  />
                </Link>
              </div>
              {/* 下一張圖片 */}
              <div
                className={`col-5 d-flex flex-column ${styles.slideContainer}`}
              >
                <Link href={`/product/${products[nextIndex].product_id}`}>
                  <img
                    className={` ${styles.slideImg} ${styles.slideNextImg}`}
                    src={products[nextIndex].product_img}
                    alt=""
                  />
                </Link>
                <div className={`d-flex`}>
                  <button
                    style={{ border: 'none', background: 'none' }}
                    className={`${styles.slideBtn}`}
                    onClick={() => setCurrentIndex(prevIndex)}
                  >
                    <i
                      className={`${styles.slideIcon} bi bi-arrow-left-circle-fill`}
                      style={{ color: '#d1ef1a' }}
                    ></i>
                  </button>
                  <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={() => setCurrentIndex(nextIndex)}
                    className={`${styles.slideBtn}`}
                  >
                    <i
                      className={`${styles.slideIcon} bi bi-arrow-right-circle-fill`}
                      style={{ color: '#d1ef1a' }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
