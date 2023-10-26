import { useEffect, useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsFire } from 'react-icons/bs'
import { FaCommentDots } from 'react-icons/fa'
import styles from './post-list.module.scss'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
// import GetPostData from './GetPostData'
function PostList() {
  // 分頁
  const [forum, setForum] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('選擇你的排序')
  const [data, setData] = useState(null)
  // const [menu, setMenu] = useState(null)
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

  // 分類
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
        setForum(response.data.forums)
        setData(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.error('資料獲取失敗:', error)
    }
  }

  useEffect(() => {
    fetchDataByType(setMenuItems)
  }, [setMenuItems])

  const handleTypeClick = (menuitems) => {
    fetchDataByType(menuitems)
  }
  //-----
  async function ChooseCategory() {
    const response = await axios.get(
      'http://localhost:3005/api/postlist/newest'
    )
    setForum(response.data.forums)
    setData(response.data)
  }
  // 初次渲染要執行
  useEffect(() => {
    // 在組件載入時執行 ChooseCategory 函式來設定預設值
    ChooseCategory()
  }, [])
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    fetchData(category)
  }

  const fetchData = async (category) => {
    try {
      let apiUrl = ''
      switch (category) {
        case '依照時間：新到舊':
          apiUrl = 'http://localhost:3005/api/postlist/newest'
          break
        case '依照時間：舊到新':
          apiUrl = 'http://localhost:3005/api/postlist/oldest'
          break
        case '依照人氣：多到少':
          apiUrl = 'http://localhost:3005/api/postlist/popularity'
          break
        case '依照人氣：少到多':
          apiUrl = 'http://localhost:3005/api/postlist/oldestFirst'
          break
        default:
          break
      }

      if (apiUrl) {
        const response = await axios.get(apiUrl)
        if (response.data) {
          setForum(response.data.forums)
          console.log(response.data.forums)
        }
        setData(response.data)
      }
    } catch (error) {
      console.error('資料獲取失敗:', error)
    }
  }
  // 分頁

  useEffect(() => {
    fetchData(selectedCategory)
  }, [selectedCategory])
  console.log(forum)
  // console.log(data)

  // 分頁
  const forumPerPage = 6

  // 這裡使用項目偏移量來控制當前頁顯示的項目。
  const [forumOffset, setForumOffset] = useState(0)

  // 模擬從其他資源獲取項目。
  const endOffset = forumOffset + forumPerPage
  // console.log(`正在載入項目從 ${forumOffset} 到 ${endOffset}`)
  const currentForum = forum.slice(forumOffset, endOffset)
  console.log(currentForum)
  const pageCount = Math.ceil(forum.length / forumPerPage)
  // 當用戶點擊請求下一頁時調用。
  const handlePageClick = (event) => {
    const newOffset = (event.selected * forumPerPage) % forum.length
    // console.log(`用戶請求頁數 ${event.selected}，對應的偏移量為 ${newOffset}`)
    setForumOffset(newOffset)
  }

  return (
    <>
      <h1 className={styles.forumTitle}>COMMUNICATE｜討論區</h1>
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={'fade'}
        // navigation={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[EffectFade, Navigation, Pagination]}
        className={`${styles.swiper}`}
      >
        <SwiperSlide className={`${styles.swiperslide}`}>
          <img src="/images/cover1.jpg" />
        </SwiperSlide>
        <SwiperSlide className={`${styles.swiperslide}`}>
          <img src="/images/cover2.jpg" />
        </SwiperSlide>
        <SwiperSlide className={`${styles.swiperslide}`}>
          <img src="/images/cover3.jpg" />
        </SwiperSlide>
      </Swiper>
      <div className={styles.nestedMenu}>
        {menuItems.map((menuItem, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
          <div
            onClick={() => {
              handleTypeClick(menuItem)
              // navActive ? setActive(false) : setActive(true)
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
          {/* 全部的內容start */}
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
                  ariaLabelledBy="dropdownMenuButton1"
                >
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照時間：新到舊')
                      }}
                      className="dropdown-item"
                      href="#"
                    >
                      依照時間：新到舊
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照時間：舊到新')
                      }}
                      class="dropdown-item"
                      href="#"
                    >
                      依照時間：舊到新
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照人氣：多到少')
                      }}
                      class="dropdown-item"
                      href="#"
                    >
                      依照人氣：多到少
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick('依照人氣：少到多')
                      }}
                      class="dropdown-item"
                      href="#"
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
            {console.log(currentForum)}
            {currentForum.map((item, index) => (
              <Link
                key={index}
                href={`/forum/${item.forum_id}`}
                style={{ color: '#3e3b35', textDecoration: 'none' }}
              >
                <div className={styles.list}>
                  {/* 裡面的內容start */}
                  <div className={styles.content}>
                    {/* 使用者圖片id跟日期start */}
                    <div
                      className={`d-block
                    ${styles.userInfo}`}
                    >
                      <p
                        className={`text-secondary
                      ${styles.date}`}
                      >
                        {item.forum_dt}
                      </p>
                      <div className={`d-flex`}>
                        <p className={styles.userId}>{item.name}</p>
                        <p
                          className={`text-secondary text-decoration-underline
                        ${styles.type}`}
                        >
                          {item.type}
                        </p>
                      </div>
                    </div>
                    {/* 使用者圖片id跟日期end */}
                    {/* 露營標題跟內容start */}
                    <p className={styles.title}>
                      {/* 超過14個字就縮短加上... */}
                      {item.title.length > 20
                        ? `${item.title.substring(0, 14)}.......`
                        : item.title}
                    </p>
                    <div className={styles.allInfo}>
                      <div className={styles.comments}>
                        {/* 標題跟內文 */}
                        <p className={styles.contentText}>
                          {item.content.length > 100
                            ? `${item.content.substring(0, 100)}.......`
                            : item.content}
                        </p>
                        {/* 按讚跟留言區start */}
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
                        {/* 案讚跟留言區end*/}
                      </div>
                      {/* 文章的照片 */}
                      {item.img_1 != 0 && (
                        <Image
                          className={`object-fit-cover
                        ${styles.camp1}`}
                          src={`http://localhost:3005/uploads/forum/${item.img_1}`}
                          alt="文章照片"
                          width={254}
                          height={254}
                        />
                      )}
                    </div>
                    {/* 露營標題跟內容end */}
                  </div>
                  {/* 裡面的內容end */}
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
          {/* 全部的內容end */}
        </div>
      ) : (
        <div>找不到資料</div>
      )}
      {/* <GetPostData
        onDataFetched={onDataFetched}
        category={setSelectedCategory}
      /> */}
    </>
  )
}
export default PostList
