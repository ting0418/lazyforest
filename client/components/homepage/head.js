import React from 'react'
import style from '@/components/homepage/head.module.scss'
import Image from 'next/image'

const Head = (props) => {
  return (
    <>
      <div>
        <div className={style.title_wrap}>
          <p className={style.title}>
            <span className={style.text_din}>{props.eng_title}</span>
            <span className={style.span}>｜</span>
            <span className={style.text_ibm}>{props.ch_title}</span>
          </p>
        </div>
      </div>
      <Image />
    </>
  )
}

export default Head
