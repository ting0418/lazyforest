import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import styles from './post-info.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useUserContext } from '@/context/UserContext'
// import forumMenuData from '@/data/product/forum-menu'
import { PiPencilSimpleLineDuotone } from 'react-icons/pi'
import { BsFire } from 'react-icons/bs'
import { FaCommentDots } from 'react-icons/fa'
import GetPostInfo from './GetPostInfo'
import moment from 'moment'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function Index() {
  // 登入資訊
  const { user, setUser } = useUserContext()
  const [data, setData] = useState(null)
  const [content, setContent] = useState(null)
  // console.log(data)
  // 需要改變網址會需要以下這兩隻
  const router = useRouter()
  const { pid } = router.query

  const onInfoFetched = (fetchedData) => {
    setData(fetchedData)
  }
  // 時間
  const currentTime = moment().format('YYYY-MM-DD')
  // 按讚功能
  console.log(data)
  const [fireCount, setFireCount] = useState(null)
  const [increment, setIncrement] = useState(true)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (data !== null) {
      setFireCount(data.forum[0].likesCount)
    }
  }, [data])
  // console.log(fireCount)

  //送出評論
  const postComment = async () => {
    if (!user.id) {
      Swal.fire({
        title: '你還沒有登入喔！',
        text: '請先去登入再來評論。',
        icon: 'error',
        confirmButtonText: '確定',
      })
      return
    }
    if (content === null || content === undefined) {
      Swal.fire({
        title: '你還沒有評論喔！',
        text: '出現了錯誤，請再試一次。',
        icon: 'error',
        confirmButtonText: '確定',
      })
    }
    const response = await axios.post(
      'http://localhost:3005/api/postInfo/' + pid,
      {
        forum_id: pid,
        member_id: user.id,
        content: content,
      }
    )
    setContent('') // 清空評論框
    Swal.fire({
      title: '留言成功',
      icon: 'success',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload()
      }
    })

    const updatedComments = [...data.comments.rows, response.data.comment]

    setData((prevData) => ({
      ...prevData,
      comments: {
        ...prevData.comments,
        rows: updatedComments,
      },
    }))
    //
  }

  // 這邊是在說當我執行這個函式，才會執行try裡面的東西，包括axios的更新資料庫
  const handleClick = async () => {
    const updatedFireCount = increment ? fireCount + 1 : fireCount - 1
    const changeFireCount = {
      likesCount: updatedFireCount,
    }
    try {
      const response = await axios.put(
        'http://localhost:3005/api/postlist/' + pid,
        changeFireCount
      )
      // 這邊執行頁面的數值更動
      setFireCount(updatedFireCount)
      console.log(updatedFireCount)
      setIncrement(!increment)

      setIsActive(!isActive)
    } catch (error) {
      console.error('更新失敗', error)
    }
  }

  // 判斷isActive的狀態
  const countTextName = isActive ? styles.fireCountActive : styles.fireCount
  const countIconName = isActive ? styles.fireIconActive : styles.fire
  return (
    <>
      {/* 下面是navbar */}
      {/* <div className={styles.nestedMenu}>
        {forumMenuData.map((menuItem, index) => (
          <div key={index} className={styles.menuItem}>
            <span className={styles.menuItemLabel}>{menuItem.label}</span>
          </div>
        ))}
      </div> */}
      {/* 上面是navbar */}
      {data && data.forum && data.comments ? (
        <div className={styles.all}>
          {/* aside-right */}
          <div className={`${styles.asideRight} `}>
            <Link href="./post-list">
              <button className="text-white mt-2 btn btn-secondary">
                返回列表
              </button>
            </Link>
            <div className={styles.info}>
              {/* 使用者資訊start */}
              <div className={`d-flex ${styles.userInfo}`}>
                <p className={styles.userId}>{data.forum[0].name}</p>
                <p
                  className={`text-secondary
                ${styles.date}`}
                >
                  {data.forum[0].forum_dt}
                </p>
              </div>
              {/* 10/21剛用 */}
              <div
                className={'d-block text-secondary text-decoration-underline'}
              >
                <p className={styles.type}>{data.forum[0].type}</p>
              </div>
              {/* 使用者資訊end */}
              {/* 連資料庫 */}
              <p className={styles.title}>{data.forum[0].title}</p>
              {data.forum[0].content.split('\n').map((line, index) => (
                <p key={index} className={styles.contentMain}>
                  {line}
                </p>
              ))}
              {data.forum[0].img_1 != 0 && (
                <Image
                  className={`object-fit-cover
                  ${styles.post_1}`}
                  src={`http://localhost:3005/uploads/forum/${data.forum[0].img_1}`}
                  alt={'圖片'}
                  width={977}
                  height={600}
                />
              )}
              {data.forum[0].img_2 != 0 && (
                <Image
                  className={`object-fit-cover
                  ${styles.post_2}`}
                  src={`http://localhost:3005/uploads/forum/${data.forum[0].img_2}`}
                  alt={'圖片'}
                  width={977}
                  height={600}
                />
              )}
              {data.forum[0].img_3 != 0 && (
                <Image
                  className={styles.post_3}
                  src={`http://localhost:3005/uploads/forum/${data.forum[0].img_3}`}
                  alt={'圖片'}
                  width={977}
                  height={600}
                />
              )}
            </div>
            {/* 標籤欄start 沒有標籤就不會顯示*/}
            <div className={styles.tags}>
              {data.forum[0].tag_1 && (
                <button className={`${styles.tag} btn btn-outline-secondary`}>
                  {data.forum[0].tag_1}
                </button>
              )}
              {data.forum[0].tag_2 && (
                <button className={`${styles.tag} btn btn-outline-secondary`}>
                  {data.forum[0].tag_2}
                </button>
              )}
              {data.forum[0].tag_3 && (
                <button className={`${styles.tag} btn btn-outline-secondary`}>
                  {data.forum[0].tag_3}
                </button>
              )}
            </div>
            {/* 按讚留言start */}
            <div className={`d-flex ${styles.commentAndFire}`}>
              <div className={`d-flex ${styles.fires}`}>
                <button type="submit" className="btn">
                  <BsFire
                    className={countIconName}
                    onClick={() => {
                      handleClick()
                    }}
                  />
                </button>
                <p className={countTextName}>{fireCount}</p>
              </div>
              <div className={`d-flex ${styles.comments}`}>
                <FaCommentDots className={styles.comment} />
                <p className={styles.commentCount}>{data.comments[0].length}</p>
              </div>
              {user.id === data.forum[0].member_id ? (
                <button className="btn d-flex ms-auto">
                  <PiPencilSimpleLineDuotone className={styles.edit} />
                </button>
              ) : null}
            </div>
            {/* 按讚留言end */}
            {/* 留言區塊start */}
            <div className={styles.messageInput}>
              <div className={`d-flex ${styles.userMessageInfo}`}>
                {/* <Image
                  className={styles.userCommentImage}
                  src={'/forums/camp1.jpeg'}
                  alt={'圖片'}
                  width={31}
                  height={31}
                /> */}
                <p className={styles.userMessageId}>{user.name}</p>
                <p className={styles.messageDate}>{currentTime}</p>
              </div>
              {/* 回應留言 */}
              {/*  */}
              <div className="form-floating px-2">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ background: '#fefff6' }}
                  className="form-control  border-0 "
                  id="floatingTextarea2"
                ></textarea>
                <label htmlFor="floatingTextarea2">留言......</label>
              </div>
              {/* 回應留言end */}
              <button
                onClick={() => {
                  postComment()
                }}
                className={`${styles.postMessage} btn d-flex ms-auto`}
              >
                送出留言
              </button>
            </div>
            <p className={styles.totalMessage}>
              共{data.comments[0].length}則留言
            </p>
            {data.comments[0].map((v) => (
              <div key={v.id}>
                <div className={`d-flex ${styles.userMessageTextInfo}`}>
                  {/* <Image
                    className={styles.user}
                    // src={message.src}會員照片
                    alt={'圖片'}
                    width={31}
                    height={31}
                  /> */}
                  <p className={styles.userMessageTextId}>{v.name}</p>
                </div>
                <p className={styles.contentText}>{v.content}</p>
                <p className={styles.messageTextDate}>{v.date}</p>
              </div>
            ))}
            {/* 留言內容end */}
          </div>
        </div>
      ) : (
        <div>沒有文章細節呦！</div>
      )}
      <GetPostInfo onInfoFetched={onInfoFetched} pid={pid} />
    </>
  )
}
