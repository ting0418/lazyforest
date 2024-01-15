/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useEffect, useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsFire } from 'react-icons/bs'
import { FaCommentDots } from 'react-icons/fa'
import styles from './post-list.module.scss'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Link from 'next/link'
import SwiperComponent from './swiper'

// import GetPostData from './GetPostData';

function PostList() {
  const [selectedCategory, setSelectedCategory] = useState('選擇你的排序')
  const [data, setData] = useState(null)

  const [menuItems, setMenuItems] = useState([
    '所有文章',
    '熱門文章',
    '二手',
    '開箱',
    '心得',
  ])

  const [navActive, setActive] = useState(false)

  const handleActiveClick = (menuItem) => {
    setActive(menuItem)
  }

  const fetchDataByType = async (menuItems) => {
    try {
      let apiUrl = ''
      switch (menuItems) {
        case '所有文章':
          apiUrl = 'http://localhost:3005/api/postlist/'
          break
        case '熱門文章':
          apiUrl = 'http://localhost:3005/api/postlist/famous'
          break
        case '開箱':
          apiUrl = 'http://localhost:3005/api/postlist/open'
          break
        case '心得':
          apiUrl = 'http://localhost:3005/api/postlist/experience'
          break
        case '二手':
          apiUrl = 'http://localhost:3005/api/postlist/used'
          break
        default:
          break
      }
      if (apiUrl) {
        const response = await axios.get(apiUrl)
        setData(response.data) // 將整個 API 響應對象存儲在 data 中
        console.log('response' + response)
      }
    } catch (error) {
      console.error('資料獲取失敗:', error)
    }
  }

  useEffect(() => {
    fetchDataByType(setMenuItems)
    handleActiveClick('所有文章')
  }, [setMenuItems])

  const handleTypeClick = (menuitems) => {
    fetchDataByType(menuitems)
    setForumOffset(0)
  }

  async function ChooseCategory() {
    try {
      const response = await axios.get('http://localhost:3005/api/postlist/')
      setData(response.data)
    } catch (error) {
      console.error('資料獲取失敗:', error)
    }
  }

  useEffect(() => {
    ChooseCategory()
  }, [])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    sortForums(category)
    setForumOffset(0)
  }
  const sortForums = (category) => {
    const sortedForums = [...data.forums]

    switch (category) {
      case '依照時間：新到舊':
        sortedForums.sort((a, b) => new Date(b.forum_dt) - new Date(a.forum_dt))
        break
      case '依照時間：舊到新':
        sortedForums.sort((a, b) => new Date(a.forum_dt) - new Date(b.forum_dt))
        break
      case '依照人氣：多到少':
        sortedForums.sort((a, b) => b.likesCount - a.likesCount)
        break
      case '依照人氣：少到多':
        sortedForums.sort((a, b) => a.likesCount - b.likesCount)
        break
      default:
        break
    }

    setData((prevData) => ({
      ...prevData,
      forums: sortedForums,
    }))
  }

  console.log(data)

  // 分頁
  const forumPerPage = 6
  const [forumOffset, setForumOffset] = useState(0)
  const endOffset = forumOffset + forumPerPage
  const currentForum = data ? data.forums.slice(forumOffset, endOffset) : []
  const pageCount = Math.ceil(data ? data.forums.length / forumPerPage : 0)

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * forumPerPage) % (data ? data.forums.length : 0)
    setForumOffset(newOffset)
  }

  return (
    <>
      <h1 className={styles.forumTitle}>COMMUNICATE｜討論區</h1>
      <SwiperComponent />
      <div className={styles.nestedMenu}>
        {menuItems.map((menuItem, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            onClick={() => {
              handleTypeClick(menuItem)
              handleActiveClick(menuItem)
            }}
            role="button"
            key={index}
            className={`${styles.menuItem} ${
              menuItem == navActive ? styles.active : ''
            } `}
          >
            <span className={styles.menuItemLabel}>{menuItem}</span>
          </div>
        ))}
      </div>

      {data && data.forums && data.forums.length > 0 ? (
        <div className={styles.all}>
          <div className={`${styles.asideRight} `}>
            <div
              className={`d-flex justify-content-between ${styles.buttonPost}`}
            >
              <div className="dropdown ">
                <button
                  className="btn bg-secondary dropdown-toggle text-white"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCategory}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照時間：新到舊')
                      }}
                      className="dropdown-item"
                    >
                      依照時間：新到舊
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照時間：舊到新')
                      }}
                      className="dropdown-item"
                    >
                      依照時間：舊到新
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照人氣：多到少')
                      }}
                      className="dropdown-item"
                    >
                      依照人氣：多到少
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照人氣：少到多')
                      }}
                      className="dropdown-item"
                    >
                      依照人氣：少到多
                    </button>
                  </li>
                </ul>
              </div>

              <Link href="/forum/post/new-post" passHref>
                <HiOutlinePencilAlt
                  style={{
                    padding: 2,
                    width: 32,
                    height: 32,
                    background: '#8E8777',
                    color: 'white',
                    borderRadius: 50,
                  }}
                />
              </Link>
            </div>
            {/* {console.log(currentForum)} */}
            {currentForum.map((item, index) => (
              <Link
                key={index}
                href={`/forum/${item.forum_id}`}
                style={{ color: '#3e3b35', textDecoration: 'none' }}
              >
                <div className={styles.list}>
                  <div className={styles.content}>
                    <div className={`d-block ${styles.userInfo}`}>
                      <p className={`text-secondary ${styles.date}`}>
                        {item.forum_dt}
                      </p>
                      <div className={`d-flex`}>
                        <p className={styles.userId}>{item.name}</p>
                        <p
                          className={`text-secondary text-decoration-underline ${styles.type}`}
                        >
                          {item.type}
                        </p>
                      </div>
                    </div>
                    <p className={styles.title}>
                      {item.title.length > 20
                        ? `${item.title.substring(0, 14)}.......`
                        : item.title}
                    </p>
                    <div className={styles.allInfo}>
                      <div className={styles.comments}>
                        <p className={styles.contentText}>
                          {item.content.length > 100
                            ? `${item.content.substring(0, 100)}.......`
                            : item.content}
                        </p>
                        <div className={`d-flex ${styles.commentAndFire}`}>
                          <div className={`d-flex ${styles.fires}`}>
                            <BsFire className={styles.fire} />
                            <p className={styles.fireCount}>
                              {item.likesCount}
                            </p>
                          </div>
                          <div className={`d-flex ${styles.fires}`}>
                            <FaCommentDots className={styles.comment} />
                            <p className={styles.commentCount}>
                              {item.comment_count}
                            </p>
                          </div>
                        </div>
                      </div>
                      {item.img_1 != 0 && (
                        <Image
                          className={`object-fit-cover ${styles.camp1}`}
                          src={`http://localhost:3005/uploads/forum/${item.img_1}`}
                          alt="文章照片"
                          width={254}
                          height={254}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="mt-5">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageClassName="pageBtn"
                previousClassName="pageBtn goBtn"
                nextClassName="pageBtn goBtn"
                breakClassName="pageBtn"
                activeClassName="pageActive"
                containerClassName="pageContainer"
                pageLinkClassName="pageLink"
                previousLinkClassName="pageLink goLink"
                nextLinkClassName="pageLink goLink"
                breakLinkClassName="pageLink"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>找不到資料</div>
      )}
    </>
  )
}

export default PostList
