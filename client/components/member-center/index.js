import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUserContext } from '@/context/UserContext'
import CityDistrictSelector from '@/components/member-center/citydistrict'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './member-info.module.scss'
import Swal from 'sweetalert2'
import Image from 'next/image'
import {
  FaCamera,
  FaRegCalendarDays,
  FaCircleExclamation,
  FaCircleChevronDown,
  FaKey,
} from 'react-icons/fa6'

export default function index() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const { user, setUser } = useUserContext()

  //選縣市+區域
  const [userCity, setUserCity] = useState('')
  const [userDistrict, setUserDistrict] = useState('')

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
  }

  async function saveUser() {
    try {
      const res = await axios.put(
        `http://localhost:3005/api/users/${user.id}`,
        user,
        {
          withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
        }
      )
      swalsavesuc()
      console.log(res)
    } catch (ex) {
      console.log({ ex })
    }
    // console.log(user)
    // const resp = await fetch(`http://localhost:3005/api/users/${user.id}`, {
    //   method: 'PUT',
    //   mode: 'cors',
    //   credentials: 'include', // save cookie in browser
    //   body: user,
    // })
    // const data = await resp.json()
    // console.log(data)
  }

  // useEffect(() => {
  //   console.log(user)
  //   if (user) {
  //     const { city, area, address } = user
  //   }
  //   if (city) {
  //     setUserCity(city)
  //   }
  //   if (area) {
  //     setUserDistrict(area)
  //   }
  // }, [user])

  const swalsavesuc = () => {
    Swal.fire({
      timer: 2000,
      title: `存檔成功`,
      // text: '歡迎回來LazyForest！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  return (
    <>
      <div className={styles.screen}>
        <div className={styles.overlap_group_wrapper}>
          <div className={styles.overlap_group}>
            <div className={styles.group} />
            <div className={styles.frame}>
              <div className={styles.member_center_wrapper}>
                <p className={styles.member_center}>
                  <span className={styles.text_wrapper}>MEMBER CENTER</span>
                  <span className={styles.span}>｜</span>
                  <span className={styles.text_wrapper_2}>會員資訊</span>
                </p>
              </div>
              <div className={styles.div}>
                <div className={styles.tr_th}>
                  <div className={styles.th}>
                    <div className={styles.th_2}>基本資料</div>
                  </div>
                  <div className={styles.th_wrapper}>
                    <div className={styles.th_3}>{''}</div>
                  </div>
                </div>
                {/* <div className={styles.avatar}>
                  <div className={styles.frame_2}>
                    <div className={styles.ellipse}>
                      <Image
                        src="/member-center/avatar.png"
                        alt="Avatar"
                        width={152}
                        height={152}
                      />
                    </div>

                    <div className={styles.camera_retro_solid_wrapper}>
                      <FaCamera className={styles.camera_retro_solid} />
                    </div>
                    <input type="file" style={{ display: 'none' }} />
                    <div className={styles.text_wrapper_3}>編輯頭像</div>
                  </div>
                </div> */}
                <div
                  className={`mx-4 d-flex justify-content-md-around ${styles.frame_3}`}
                >
                  <div className={` ${styles.frame_4}`}>
                    <div className={styles.input}>
                      <div className={styles.form_control}>姓名</div>
                      <div className={styles.input_2}>
                        <input
                          className={`${styles.text_input} form-control`}
                          value={user.name}
                          onChange={(e) => {
                            // 更新 user.name 的狀態
                            setUser({ ...user, name: e.target.value })
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.input}>
                      <div className={styles.form_control}>聯絡電話</div>
                      <div className={styles.input_2}>
                        <input
                          className={`${styles.text_input} form-control`}
                          value={user.phone}
                          onChange={(e) => {
                            // 更新 user.phone 的狀態
                            setUser({ ...user, phone: e.target.value })
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.input}>
                      <div className={styles.form_control}>信箱</div>
                      <div className={styles.input_2}>
                        <input
                          className={`${styles.text_input} form-control`}
                          type="email"
                          value={user.account}
                          onChange={(e) => {
                            // 更新 user.email 的狀態
                            setUser({ ...user, account: e.target.value })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.frame_4}>
                    <div className={styles.input}>
                      <div className={styles.form_control}>暱稱</div>
                      <div className={styles.input_2}>
                        <input
                          className={`${styles.text_input} form-control`}
                          value={user.nickname}
                          onChange={(e) => {
                            // 更新 user.nickname 的狀態
                            setUser({ ...user, nickname: e.target.value })
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.input}>
                      <div className={styles.form_control}>生日</div>
                      {/* <div className={styles.input_2}>
                        <input 
                        className={styles.text_input}
                        value={selectedDate ? selectedDate.toDateString() : ''}
                        readOnly
                        onClick={toggleDatePicker}
                        />
                        <div className={styles.icon}>
                          <FaRegCalendarDays className={styles.vector} 
                          onClick={toggleDatePicker}
                          />
                        </div>
                      </div> */}
                      {/* {showDatePicker && ( */}
                      <div className={styles.input_date}>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          className={`${styles.text_input_date} form-control`}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          yearDropdownItemNumber={15}
                          value={user.birth}
                          defaultValue={user.birth}
                        />
                        <FaRegCalendarDays
                          className={styles.vector_date}
                          onClick={toggleDatePicker}
                        />
                      </div>
                      {/* )} */}
                      <div className={styles.frame_5}>
                        <FaCircleExclamation className={styles.warning} />
                        <div className={styles.text_wrapper_4}>
                          生日儲存後將無法修改，請確認資料是否正確
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.frame_4}`}>
                  <div className={styles.frame_6}>
                    <div className={styles.input}>
                      <div className={styles.form_control}>地址</div>
                      <div className={styles.dropdown_wrapper}>
                        <CityDistrictSelector
                          className="bg-light"
                          selectedCity={userCity}
                          setSelectedCity={setUserCity}
                          selectedDistrict={userDistrict}
                          setSelectedDistrict={setUserDistrict}
                        />
                        {/* <select className={`form-select ${styles.input_3}`}>
                          <option selected className={styles.text_wrapper_5}>
                            城市/縣
                          </option>
                          <option value="1" className={styles.text_wrapper_5}>
                            option1
                          </option>
                          <option value="2" className={styles.text_wrapper_5}>
                            option2
                          </option>
                          <option value="3" className={styles.text_wrapper_5}>
                            option3
                          </option>
                        </select> */}
                        {/* <div className={styles.vector_wrapper}>
                          <FaCircleChevronDown className={styles.vector} />
                        </div> */}
                      </div>
                    </div>
                    {/* <div className={styles.dropdown_wrapper}> */}
                    {/* <select className={`form-select ${styles.input_3}`}>
                        <option selected className={styles.text_wrapper_5}>
                          地區
                        </option>
                        <option value="1" className={styles.text_wrapper_5}>
                          option1
                        </option>
                        <option value="2" className={styles.text_wrapper_5}>
                          option2
                        </option>
                        <option value="3" className={styles.text_wrapper_5}>
                          option3
                        </option>
                      </select> */}
                    {/* <div className={styles.vector_wrapper}>
                          <FaCircleChevronDown className={styles.vector} />
                        </div> */}
                    {/* </div> */}
                    {/* <div className={styles.input_3}>
                      <div className={styles.text_wrapper_5}>地區</div>
                      <div className={styles.icon}>
                        <FaCircleChevronDown className={styles.vector} />
                      </div>
                    </div> */}
                  </div>
                  <div className={styles.text_input_wrapper}>
                    <input
                      className={`${styles.text_input} form-control`}
                      value={user.address}
                      onChange={(e) => {
                        // 更新 user.name 的狀態
                        setUser({ ...user, address: e.target.value })
                      }}
                    />
                  </div>
                </div>
                <button className={`btn ${styles.btn}`} onClick={saveUser}>
                  <div className={styles.frame_7}>
                    <div className={styles.text_wrapper_6}>存檔</div>
                  </div>
                </button>
                {/* <button className={`btn ${styles.btn}`}>
                  <div className={styles.frame_7}>
                    <FaKey className={styles.key} />
                    <div className={styles.text_wrapper_6}>變更密碼</div>
                  </div>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
