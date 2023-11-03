// import React, { useState } from 'react'
import Swal from 'sweetalert2'
import styles from './index.module.scss'
import { useUserContext } from '@/context/UserContext'
import { BsExclamationCircle } from 'react-icons/bs'

// 標籤套件所需要的套件
import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Input, Space, Tag, theme, Tooltip } from 'antd'
import axios from 'axios'

function PostModal() {
  // 登入
  const { user, setUser } = useUserContext()
  const [textTotal, setTextTotal] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('選擇你的類別')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState(null)
  // 圖片
  const [selectedFiles, setSelectedFiles] = useState([])
  console.log(selectedFiles)
  const handleFileChange = (event) => {
    const files = event.target.files
    console.log(files)
    setSelectedFiles(files)
  }
  // console.log(type)

  //============================
  const postImages = async () => {
    // 創建一個 FormData 物件
    const formData = new FormData()
    // let formDataArr
    const keys = Object.keys(selectedFiles)
    console.log(keys)

    if (keys.length > 0) {
      keys.forEach((v) => {
        formData.append('avatars', selectedFiles[v])
        // formDataArr = formData.getAll('avatars')
        // console.log('formDataArr', formDataArr)
      })
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/postlist/upload3',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      let img1 = 0
      let img2 = 0
      let img3 = 0
      if (response.data.filename[2]) {
        img1 = response.data.filename[0].filename
        img2 = response.data.filename[1].filename
        img3 = response.data.filename[2].filename
      } else if (response.data.filename[1]) {
        img1 = response.data.filename[0].filename
        img2 = response.data.filename[1].filename
      } else if (response.data.filename[0]) {
        img1 = response.data.filename[0].filename
      }
      console.log(img1)
      // 處理成功回應
      console.log('成功', response.data)
      post(img1, img2, img3)
    } catch (error) {
      // 處理錯誤
      console.error('發送請求錯誤', error)
    }
  }
  //=============================
  const post = async (img1, img2, img3) => {
    if (!title || !content || !type) {
      // 如果標題、內容或類別有任何一個未輸入文字，顯示通知
      Swal.fire({
        title: '發布失敗',
        text: '標題、內容和類別為必填項目',
        icon: 'error',
        confirmButtonText: '確定',
      })
      return // 不繼續執行發布流程
    }
    console.log(img1)
    const tagData = {}
    for (let i = 0; i < tags.length; i++) {
      tagData[`tag_${i + 1}`] = tags[i]
    }

    const response = await axios.post('http://localhost:3005/api/postlist/', {
      member_id: user.id,
      title: title,
      type: type,
      content: content,
      // forum_dt: new Date().toISOString(),
      likesCount: 0,
      img_1: img1,
      img_2: img2,
      img_3: img3,
      ...tagData,
    })
    if (title !== null && content !== null && type !== null) {
      Swal.fire({
        title: '發布成功',
        icon: 'success',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          // 重整
          window.location.href = 'http://localhost:3000/forum/post-list/'
        }
      })
    }

    console.log('貼文成功', response.data)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  // 標籤套件測試
  const { token } = theme.useToken()
  const [tags, setTags] = useState([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const inputRef = useRef(null)
  const editInputRef = useRef(null)
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])
  useEffect(() => {
    editInputRef.current?.focus()
  }, [editInputValue])
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    console.log(newTags)
    setTags(newTags)
  }
  const showInput = () => {
    setInputVisible(true)
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }
  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setEditInputValue('')
  }
  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
  }
  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  }
  return (
    <>
      <div className={styles.all}>
        {/* <div className={styles.asideLeft}>aside-left</div> */}
        <div className={`${styles.asideRight} px-1 container`}>
          <div>
            <h1 className={`text-center  border-bottom p-3 ${styles.title}`}>
              編輯文章
            </h1>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
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
                      handleCategoryClick('二手')
                      setType('二手')
                    }}
                    className="dropdown-item"
                  >
                    二手
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCategoryClick('開箱')
                      setType('開箱')
                    }}
                    className="dropdown-item"
                  >
                    開箱
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCategoryClick('心得')
                      setType('心得')
                    }}
                    className="dropdown-item"
                  >
                    心得
                  </button>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <p className={styles.rules}>
                <BsExclamationCircle style={{ background: '8E8777' }} />
                發文規則
              </p>
            </button>

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      style={{ color: 'red' }}
                      className="modal-title"
                      id="staticBackdropLabel"
                    >
                      發文注意事項！
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    1. 請勿發表包含以下狀況的內容或連結：
                    對使用者、特定個人、組織或群體發表中傷、歧視、挑釁、羞辱、謾罵、不雅字詞或人身攻擊等言論，
                    或對具備共同特徵或屬性的族群發表仇恨性言論，將被刪文並依照下表的違規次數和停權天數懲處，
                    情節嚴重者視情況加重停權天數。
                    <br />
                    2.
                    張貼商業廣告內容與連結、邀請碼或內含個人代碼的邀請連結等，刪文加停權
                    7 天。
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary text-white"
                      data-bs-dismiss="modal"
                    >
                      我了解了
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 發文規則及下拉式選單end */}
          {/* 標題start */}
          <div>
            <div className="form-floating">
              <textarea
                style={{ background: '#fefff6' }}
                maxLength={80}
                className="form-control  border-0"
                value={title}
                id="floatingTextarea2"
                onChange={(e) => {
                  setTextTotal(e.target.value.length)
                  setTitle(e.target.value)
                }}
              ></textarea>
              <label htmlFor="floatingTextarea2">
                標題
                <span>({textTotal}/80)</span>
              </label>
            </div>
          </div>
          {/* 標題end */}
          {/* 敘述start */}
          <div className="mt-5">
            <div className="form-floating">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
                style={{ background: '#fefff6', height: 350 }}
                name="content"
                className="form-control  border-0"
                id="floatingTextarea2"
              ></textarea>
              <label htmlFor="floatingTextarea2">敘述</label>
            </div>
          </div>
          {/* 敘述end */}

          <input
            name="avatars"
            onChange={handleFileChange}
            className="formControl"
            type="file"
            id="formFileMultiple"
            multiple
            max={3}
          />

          <div className="d-flex border-bottom py-3">
            <Space size={[0, 8]} wrap>
              {tags.map((tag, index) => {
                if (tags.length >= 3) {
                  // 如果標籤數量已達到項，保留已輸入的標籤並隱藏輸入框
                  return (
                    <Tag
                      key={tag}
                      closable={index !== 0}
                      style={{
                        userSelect: 'none',
                      }}
                      onClose={() => handleClose(tag)}
                    >
                      <span
                        onDoubleClick={(e) => {
                          if (index !== 0) {
                            setEditInputIndex(index)
                            setEditInputValue(tag)
                            e.preventDefault()
                          }
                        }}
                      >
                        {tag}
                      </span>
                    </Tag>
                  )
                } else {
                  // 如果標籤數量未達到3項，則根據條件渲染輸入框或標籤
                  if (editInputIndex === index) {
                    return (
                      <Input
                        ref={editInputRef}
                        key={tag}
                        size="small"
                        style={tagInputStyle}
                        value={editInputValue}
                        onChange={handleEditInputChange}
                        onBlur={handleEditInputConfirm}
                        onPressEnter={handleEditInputConfirm}
                      />
                    )
                  }
                  const isLongTag = tag.length > 20
                  const tagElem = (
                    <Tag
                      key={tag}
                      closable={index != -1}
                      style={{
                        userSelect: 'none',
                      }}
                      onClose={() => handleClose(tag)}
                    >
                      <span
                        onDoubleClick={(e) => {
                          if (index !== 0) {
                            setEditInputIndex(index)
                            setEditInputValue(tag)
                            e.preventDefault()
                          }
                        }}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag>
                  )

                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  )
                }
              })}

              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={tagInputStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                tags.length < 3 && (
                  <Tag
                    style={tagPlusStyle}
                    icon={<PlusOutlined />}
                    onClick={showInput}
                  >
                    新增標籤
                  </Tag>
                )
              )}
            </Space>
          </div>

          {/* 圖片跟按鈕end */}
          <div className="d-flex">
            <button
              onClick={() => {
                postImages()
              }}
              type="submit"
              className={`btn ms-auto my-4 ${styles.post}`}
            >
              重新發布
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostModal
