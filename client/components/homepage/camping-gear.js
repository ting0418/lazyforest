import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import styles from '@/components/homepage/camping-gear.module.scss'
import Link from 'next/link'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function CampingGear() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  }

  return (
    <>
      {/* 桌機版 */}
      <div className={`${styles.container} d-none d-md-block`}>
        <div className={`${styles.campingGear}`}>
          <p className={`${styles.text1}`}>WHAT’S AROUND?</p>
          <p className={`${styles.text2}`}>附近營區</p>
        </div>
        <div className={`row ${styles.item}`}>
          <div className={`col ${styles.gearMap}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.023547507425!2d120.91830657534015!3d23.88878367857623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d7dc82ff7e7f%3A0x16360a1d93e62c58!2z5bOH5bWQ5p2J5LiYIOWlouiPr-mcsueHnw!5e0!3m2!1szh-TW!2stw!4v1697954502141!5m2!1szh-TW!2stw"
              width="100%"
              height="560"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* <FCMap /> */}
            {/* <div style={{ height: '100%', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div> */}
          </div>
          <div
            className={`col ${styles.gearInt} d-flex flex-column justify-content-between`}
          >
            <div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <img
                    className={`${styles.logoImg} me-4`}
                    src="./images/homepage/lazyforest-face.png"
                    alt=""
                  />
                  <p className={`${styles.title}`}>峇嵐杉丘</p>
                </div>
                <p className={`${styles.address}`}>南投縣魚池鄉文正巷2之6號</p>
              </div>
              <div>
                <p className={`${styles.intro}`}>
                  於2022年6月1日全新開幕的南投峇嵐杉丘豪華露營區鄰近於南投日月潭國家風景區，以希臘神話阿波羅為主題，獨特的帳篷設計讓陽光充滿每一個角落，免出帳篷就能感受到滿滿陽光和森林綠意，此外在帳篷內從燈具、沙發、地毯也都經特別挑選，在自然光的加持下，每個角落都...
                </p>
              </div>
              <div className="d-flex justify-content-between py-5">
                <button className={`${styles.btn}`}>豪華露營</button>
                <Link href="/camp/1" className="d-flex">
                  <p className={`${styles.seeMore}`}>SEE MORE</p>
                  <i
                    className="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: '14px', color: '#A1B719' }}
                  ></i>
                </Link>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <img
                  className={`${styles.image}`}
                  src="/images/camp_img/camp01-3.jpeg"
                  // src="/images/camp_img/camp01-3.jpeg"
                  alt=""
                  style={{
                    width: '160px',
                    height: '160px',
                    marginRight: '10px',
                    borderRadius: '8px',
                  }}
                />
                <img
                  className={`${styles.image}`}
                  src="/images/camp_img/camp01-B.jpeg"
                  // src="/images/camp_img/camp01-B.jpeg"
                  alt=""
                  style={{
                    width: '160px',
                    height: '160px',
                    marginRight: '10px',
                    borderRadius: '8px',
                  }}
                />
                <img
                  className={`${styles.image}`}
                  src="/images/camp_img/camp04-2.jpeg"
                  // src="/images/camp_img/camp04-2.jpeg"
                  alt=""
                  style={{
                    width: '160px',
                    height: '160px',
                    marginRight: '10px',
                    borderRadius: '8px',
                  }}
                />
                <img
                  className={`${styles.image}`}
                  src="/images/camp_img/camp04-3.jpeg"
                  // src="/images/camp_img/camp04-3.jpeg"
                  alt=""
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
      {/* 手機版 */}
      {/* 從這邊開始寫，照著figma切 */}
      <div className="d-block d-md-none container">
        <div className="text-center">
          <div className={`${styles.around} text-dark`}>WHAT’S AROUND?</div>
          <div className="text-info mb-4">附近營區</div>
        </div>
        <div className={`${styles.mobliemap} my-2 mx-auto`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.023547507425!2d120.91830657534015!3d23.88878367857623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d7dc82ff7e7f%3A0x16360a1d93e62c58!2z5bOH5bWQ5p2J5LiYIOWlouiPr-mcsueHnw!5e0!3m2!1szh-TW!2stw!4v1697954502141!5m2!1szh-TW!2stw"
            width="302px"
            height="260px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact> */}
        </div>
        <div className="d-flex px-4 ">
          <div className={`${styles.titlePh}`}>峇嵐杉丘</div>
          <div className={`${styles.introPh} ms-auto`}>
            南投縣魚池鄉文正巷2之6號
          </div>
        </div>
        <p className={`${styles.info} px-4 `}>
          於2022年6月1日全新開幕的南投峇嵐杉丘豪華露營區鄰近於南投日月潭國家風景區，以希臘神話阿波羅為主題，獨特的帳篷設計讓陽光充滿每一個角落，免出帳篷就能感受到滿滿陽光和森林綠意，此外在帳篷內從燈具、沙發、地毯也都經特別挑選，在自然光的加持下，每個角落都...
        </p>
        <div className="d-flex  justify-content-between px-4">
          <button className={`${styles.btnPh}`}>豪華露營</button>
          <Link href="/camp/category" className="d-flex text-decoration-none">
            <p className={`${styles.seeMorePh}`}>SEE MORE</p>
            <i
              className="bi bi-arrow-right-circle-fill ms-2"
              style={{ fontSize: '14px', color: '#A1B719' }}
            ></i>
          </Link>
        </div>
        <div className="d-flex justify-content-evenly mb-5">
          <div>
            <img
              className={`${styles.gearpic} rounded`}
              src="/images/camp_img/camp01-1.jpeg"
            />
          </div>
          <div>
            <img
              className={`${styles.gearpic}`}
              src="/images/camp_img/camp06-1.jpeg"
            />
          </div>
          <div>
            <img
              className={`${styles.gearpic}`}
              src="/images/camp_img/camp01-1.jpeg"
            />
          </div>
          {/* <div>
            <img
              className={`${styles.gearpic}`}
              src="/images/camp_img/camp01-1.jpeg"
            />
          </div> */}
        </div>
      </div>
    </>
  )
}
