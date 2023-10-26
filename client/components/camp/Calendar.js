import React, { Component } from 'react'
import * as _ from 'lodash'
import styles from '../camp/Calendar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class Test extends Component {
  state = {
    startDate: null,
    endDate: null,
  }

  componentDidMount() {
    this.initState()
  }

  initState = ({ y, m } = {}) => {
    let date = new Date()
    let year = y || date.getFullYear()
    let month = m || date.getMonth() + 1
    let today = new Date()

    let date2 = new Date(year, month, 0)
    let days = date2.getDate()

    date2.setDate(1)
    let day = date2.getDay()

    let list = []

    for (let i = 0; i < days + day; i++) {
      if (i < day) {
        list.push('')
      } else {
        let dayNumber = i - day + 1

        let isToday =
          year === today.getFullYear() &&
          month === today.getMonth() + 1 &&
          dayNumber === today.getDate()
        list.push({ dayNumber, isToday })
      }
    }
    let hlist = _.chunk(list, 7)
    let len = hlist.length
    let to = 7 - hlist[len - 1].length

    for (let i = 0; i < to; i++) {
      hlist[len - 1].push('')
    }
    this.setState({
      date,
      year,
      month,
      days,
      day,
      hlist,
      today,
    })
  }

  // 日期
  handleDateClick = (dayNumber) => {
    const { startDate, endDate } = this.state
    const today = new Date()

    const selectedDate = new Date(
      this.state.year,
      this.state.month - 1,
      dayNumber
    )

    //不可以比今天前面的日期
    if (selectedDate < today) {
      return
    }

    //設定起始以及結束的日期
    if (!startDate || dayNumber < startDate) {
      // 如果 startDate 为空或新日期比旧的 startDate 更早，将选中的日期存储为新的 startDate
      const startDateString = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`
      localStorage.setItem('startDate', startDateString)

      this.setState({
        startDate: dayNumber,
        endDate: null,
      })
    } else if (!endDate) {
      // 如果 endDate 为空，将选中的日期存储为结束日期
      const endDateString = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`
      localStorage.setItem('endDate', endDateString)

      this.setState({
        endDate: dayNumber,
      })
    } else {
      // 清除选中的日期
      localStorage.removeItem('startDate')
      localStorage.removeItem('endDate')

      this.setState({
        startDate: null,
        endDate: null,
      })
    }
  }

  renderDateCell = (item) => {
    const { startDate, endDate } = this.state
    if (item === undefined || item.dayNumber === undefined) {
      // 如果 item 或 item.dayNumber 为 undefined，则不渲染任何内容
      return null
    }

    const isEmpty = item === ''

    const isStartDate = item.dayNumber === startDate
    const isEndDate = item.dayNumber === endDate
    const isInRange =
      startDate &&
      endDate &&
      item.dayNumber > startDate &&
      item.dayNumber <= endDate

    return (
      <td
        key={item.dayNumber}
        className={`${styles.calendarCell} ${
          item.isToday ? styles.today : ''
        } ${isStartDate ? styles.selectedStartDate : ''} ${
          isEndDate ? styles.selectedEndDate : ''
        } ${isInRange ? styles.inDateRange : ''}`}
        onClick={() => !isEmpty && this.handleDateClick(item.dayNumber)}
      >
        {isEmpty ? null : item.dayNumber}
      </td>
    )
  }

  // 上月
  handlePrevMonth = () => {
    let prevMonth = this.state.month - 1
    let prevYear = this.state.year
    if (prevMonth < 1) {
      prevMonth = 12
      prevYear -= 1
    }
    this.initState({
      y: prevYear,
      m: prevMonth,
    })
  }

  // 下月
  handleNextMonth = () => {
    let nextMonth = this.state.month + 1
    let nextYear = this.state.year
    if (nextMonth > 12) {
      nextMonth = 1
      nextYear += 1
    }
    this.initState({
      y: nextYear,
      m: nextMonth,
    })
  }

  render() {
    const { year, month, hlist } = this.state

    if (!hlist) {
      return null
    }

    return (
      <div className={styles.calendar}>
        <h2 className={styles.year}>{year}</h2>
        <div className={styles.month}>
          <button
            className={styles.prevMonthButton}
            onClick={this.handlePrevMonth}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h2 className={styles.monthNames}>{monthNames[month - 1]}</h2>{' '}
          {/* 使用月份名称 */}
          <button
            className={styles.nextMonthButton}
            onClick={this.handleNextMonth}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>

        <table className={styles.calendarTable}>
          <tbody>
            <tr>
              {weeks.map((el) => (
                <th key={el}>{el}</th>
              ))}
            </tr>
            {this.state.hlist.map((el, i) => {
              return (
                <tr key={i}>
                  {el.map((item, ii) => this.renderDateCell(item))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Test
