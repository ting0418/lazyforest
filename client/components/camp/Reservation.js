// components/Reservation.js
import React from 'react';
import styles from './Reservation.module.scss';

function Reservation({ zone_name, zone_amount, zone_price }) {
  return (
    <tr className={styles.reservation}>
      <td className={styles.centered}>{zone_name}</td>
      <td className={styles.centered}>{zone_amount}</td>
      <td className={styles.centered}>${zone_price}</td>
    </tr>
  );
}

export default Reservation;