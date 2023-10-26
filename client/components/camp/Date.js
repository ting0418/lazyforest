// Date.js
import React from 'react';
import DatePicker from 'react-datepicker';
import styles from '../camp/Date.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';

const Date = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.datePickerRow}>
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          placeholderText="開始日期"
          className={`${styles.datePickerInput} ${styles.datePickerLeft}`}
          calendarClassName={styles.datePickerCalendar}
        />
        <span className={styles.calendarIcon}>
          <FaCalendar />
        </span>
        <span className={styles.dateSeparator}>-</span>
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          placeholderText="结束日期"
          className={styles.datePickerInput}
          calendarClassName={styles.datePickerCalendar}
        />
        <span className={styles.calendarIcon}>
          <FaCalendar />
        </span>
      </div>
    </div>
  );
};

export default Date;
