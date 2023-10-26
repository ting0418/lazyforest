import React from 'react'
import styles from '@/components/product/product-brand-intro.module.scss'

export default function ProductBrandIntro({ brand }) {
  return (
    <>
      <div className={` ${styles.brandCard} card mb-3`}>
        <div className="row g-0">
          <div className={`col-md-4 p-4 ${styles.brandImgContainer}`}>
            <img
              src={`/images/brand/${brand.brand_img}`}
              className={`${styles.brandImg} img-fluid rounded-start`}
              alt=""
            />
          </div>
          <div className={`${styles.brandTextContainer} col-md-8 text-bg-dark`}>
            {/* <div className={`${styles.cardLine}`}></div> */}
            <div className="card-body p-5 ">
              <h5 className={`${styles.cardTitle}`}>{brand.brand_name}</h5>
              <p className={`${styles.cardText}`}>{brand.brand_intro}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
