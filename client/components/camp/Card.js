// Card.js
import React from 'react'
import styles from '../camp/Card.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowRight,
  faWifi,
  faUsers,
  faUtensils,
  faPersonSwimming,
  faCampground,
  faFish,
  faWater,
  faBug,
  faStar,
  faHotTub,
  faStar as faStarSolid,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

const Card = ({
  id,
  camp_img,
  camp_name,
  camp_address,
  rating,
  wifi,
  food,
  group,
  swimming,
  rent,
  fishing,
  stream,
  firefly,
  view,
  tub,
}) => {
  const starIcons = []

  for (let i = 0; i < 5; i++) {
    const isFilled = i < rating
    starIcons.push(
      <FontAwesomeIcon
        icon={isFilled ? faStarSolid : faStarRegular}
        key={i}
        className={`star ${isFilled ? 'filled' : ''}`}
      />
    )
  }

  return (
    <div className={`${styles.card}`}>
      <div className={styles.imageWrapper}>
        <img
          src={`/images/camp_img/${camp_img}`}
          alt={camp_name}
          className={styles.image}
        />
        <div className={styles.rectangle}></div>
      </div>

      <h2>{camp_name}</h2>
      <p>{camp_address}</p>

      <div>
        <div className={`${styles.stars}`}>{starIcons}</div>
      </div>

      <div className={styles.icons}>
        {wifi === 1 && (
          <FontAwesomeIcon icon={faWifi} className={styles.icon} />
        )}
        {food === 1 && (
          <FontAwesomeIcon icon={faUtensils} className={styles.icon} />
        )}
        {group === 1 && (
          <FontAwesomeIcon icon={faUsers} className={styles.icon} />
        )}
        {swimming === 1 && (
          <FontAwesomeIcon icon={faPersonSwimming} className={styles.icon} />
        )}
        {rent === 1 && (
          <FontAwesomeIcon icon={faCampground} className={styles.icon} />
        )}
        {fishing === 1 && (
          <FontAwesomeIcon icon={faFish} className={styles.icon} />
        )}
        {stream === 1 && (
          <FontAwesomeIcon icon={faWater} className={styles.icon} />
        )}
        {firefly === 1 && (
          <FontAwesomeIcon icon={faBug} className={styles.icon} />
        )}
        {view === 1 && (
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
        )}
        {tub === 1 && (
          <FontAwesomeIcon icon={faHotTub} className={styles.icon} />
        )}
      </div>

      <div
        key={id}
        className={`d-flex justify-content-end ${styles.viewMoreWrapper}`}
      >
        <Link href={`/camp/${id}`} as={`/camp/${id}`}>
          <button className={`btn ${styles.viewMore}`}>
            VIEW MORE{' '}
            <FontAwesomeIcon
              className={`${styles.arrow}`}
              icon={faCircleArrowRight}
            />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Card
