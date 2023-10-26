import React from 'react'
import styles from './member-map.module.scss'
import Image from 'next/image'
import { FaStar, FaRegStar, FaPenToSquare, FaTrashCan } from 'react-icons/fa6'

export default function Map() {
  return (
    <>
      <div className={styles.screen}>
        <div className={styles.div}>
          <div className={styles.title}>
            <p className={styles.my_map}>
              <span className={styles.text_wrapper}>MY MAP</span>
              <span className={styles.span}>｜</span>
              <span className={styles.text_wrapper_2}>我的地圖</span>
            </p>
          </div>
          <div className={styles.my_map_2}>
            <div className={styles.tr_th}>
              <div className={styles.th}>
                <div className={styles.text_wrapper_3}>總露營次數</div>
                <div className={styles.text_wrapper_4}>12</div>
              </div>
              <div className={styles.th_2}>
                <div className={styles.text_wrapper_3}>最愛造訪的城市</div>
                <div className={styles.text_wrapper_4}>桃園市</div>
              </div>
              <div className={styles.th_2}>
                <div className={styles.text_wrapper_3}>已評價營地</div>
                <div className={styles.text_wrapper_4}>3</div>
              </div>
              <div className={styles.frame_wrapper}>
                <div className={styles.frame}>
                  <p className={styles.p}>
                    <span className={styles.text_wrapper}>LV5</span>
                    <span className={styles.text_wrapper_5}> 老手級玩家</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.rating_map}>
              <Image
                src="/member-center/map.png"
                alt="map"
                width={495}
                height={993}
              />
              <div className={styles.rating_right}>
                <div className={styles.rating_location}>
                  <div className={styles.rectangle} />
                  <div className={styles.frame_2}>
                    <div className={styles.frame_3}>
                      <div className={styles.frame_4}>
                        <div className={styles.text_wrapper_6}>峇嵐杉丘</div>
                        <div className={styles.text_wrapper_7}>
                          南投縣魚池鄉文正巷2之6號
                        </div>
                      </div>
                      <div className={styles.text_wrapper_8}>
                        上次造訪時間：2023/08/18-2023/08/20
                      </div>
                      <div className={styles.text_wrapper_8}>
                        歷史造訪次數：2次
                      </div>
                    </div>
                    <Image
                      src="/member-center/campsite.png"
                      alt="campsite"
                      height={329}
                      width={582}
                    />
                  </div>
                </div>
                <div className={styles.rating_edit}>
                  <div className={styles.rectangle_2} />
                  <div className={styles.frame_5}>
                    <div className={styles.group}>
                      <FaPenToSquare className={styles.pen_to_square_solid} />
                    </div>
                    <div className={styles.group}>
                      <FaTrashCan className={styles.trash_can_solid} />
                    </div>
                  </div>
                  <div className={styles.rating_part}>
                    <div className={styles.rating_title}>
                      <p className={styles.element}>
                        <span className={styles.text_wrapper_9}>評價時間</span>
                        <span className={styles.text_wrapper_10}>&nbsp;</span>
                        <span className={styles.text_wrapper_11}>
                          2023-06-15
                        </span>
                      </p>
                      <div className={styles.stars}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaRegStar />
                      </div>
                    </div>
                    <div className={styles.text_wrapper_12}>
                      這個露營區真難預約訂位，
                      因為工作時間和孩子上學的關係，我們只能利用周休二日露營，結果每次預約櫻花谷都沒營位，預約了快兩年終於逮到機會，有人退訂營位，二話不說立刻下訂，全家人...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
