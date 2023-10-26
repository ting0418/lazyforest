import React, { useState } from 'react'
import styles from '@/components/product/product-item.module.scss'
import Link from 'next/link'
import ProductFav from './product-fav'
import { useUserContext } from '@/context/UserContext'

export default function ProductItem({
  currentproducts,
  notifyAdd,
  notifyRemove,
  notifyAddCart,
  notifyLogin,
  loading,
  swalAddCart,
  swalRemove,
  swalAdd,
}) {
  const today = new Date().getTime()
  const { favorites, setFavorites } = useUserContext()
  const handleTriggerFav = (id) => {
    // 在陣列中->移出，不在陣列中加入
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((v) => v !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }
  return (
    <>
      {loading ? (
        <div className="row">
          {currentproducts.map((v) => {
            return (
              <div key={v.id} className="col-lg-3 col-6">
                <div className={` ${styles.card}`}>
                  <div className={`${styles.cardHead}`}>
                    <img
                      className={`${styles.cardImg}`}
                      src={`/images/load3.gif`}
                      alt="tent"
                    />
                    {/* 收藏按鈕 */}
                  </div>
                  <div className={`${styles.cardBody}`}>
                    <div
                      className={`${styles.cardLoadLine} ${styles.cardLoadLine1}`}
                    >
                      <parent className={`${styles.hiddenWords}`}>123</parent>
                    </div>
                    <div
                      className={`${styles.cardLoadLine} ${styles.cardLoadLine2}`}
                    >
                      <p className={`${styles.hiddenWords}`}>123</p>
                    </div>
                    <div
                      className={`${styles.cardLoadLine} ${styles.cardLoadLine3}`}
                    >
                      <p className={`${styles.hiddenBadge}`}>123</p>
                    </div>
                    <div
                      className={`${styles.cardLoadLine} ${styles.cardLoadLine3}`}
                    >
                      <p className={`${styles.hiddenBadge}`}>123</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="row">
          {currentproducts.map((v) => {
            return (
              <div key={v.id} className="col-lg-3 col-6">
                <div className={` ${styles.card}`}>
                  <div className={`${styles.cardHead}`}>
                    <img
                      className={`${styles.cardImg}`}
                      src={`/images/products/${v.product_img}.jpeg`}
                      alt="tent"
                    />
                    {/* 收藏按鈕 */}
                    <ProductFav
                      product={v}
                      id={v.id}
                      handleTriggerFav={handleTriggerFav}
                      notifyAdd={notifyAdd}
                      notifyRemove={notifyRemove}
                      notifyAddCart={notifyAddCart}
                      notifyLogin={notifyLogin}
                      swalAddCart={swalAddCart}
                      swalRemove={swalRemove}
                      swalAdd={swalAdd}
                    />
                  </div>
                  <Link
                    className={`${styles.itemLink}`}
                    href={`/product/${v.id}`}
                  >
                    <div className={`${styles.cardBody}`}>
                      <h4 className={`${styles.cardTitle} my-0`}>
                        {v.product_name}
                      </h4>
                      <h3 className={`${styles.cardPrice} my-0`}>
                        NT$ {parseInt(v.product_price * v.product_discount)}
                      </h3>
                      {v.product_discount === 1 ? null : (
                        <h5 className={`${styles.cardDelPrice} my-0`}>
                          NT$ {v.product_price}
                        </h5>
                      )}

                      {/* 判斷是否為新商品去展示 new 標籤 {v.updated_at } */}
                      <div className={` ${styles.productTags}`}>
                        {today - Date.parse(v.created_at) <= 86400000 * 30 ? (
                          <span
                            className={`badge text-dark ${styles.cardBadge}`}
                          >
                            New
                          </span>
                        ) : null}

                        {v.product_discount === 1 ? null : (
                          <span
                            className={`badge text-dark ${styles.cardBadge}`}
                          >
                            {Math.floor(
                              (100 - v.product_discount * 100).toFixed(2)
                            )}
                            %off
                          </span>
                        )}
                        <span className={`badge ${styles.hiddenBadge}`}>0</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
