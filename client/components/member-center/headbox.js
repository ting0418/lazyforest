import React from 'react'
import style from '@/components/member-center/headbox.module.scss'

function Headbox({
  mode,
  thText,
  thNumber,
  th2Text,
  th2Number,
  th3Text,
  th3Number,
  customStyle,
  useButton,
  onClick,
  // items,
}) {
  const handleClickA = () => {
    onClick('商品')
  }
  const handleClickB = () => {
    onClick('營地')
  }

  const handleClick = (e) => {
    console.log({ e })
    onClick(e.target.innerText)
  }

  // const btns = items.map( i => {
  //   return (
  //     <a onClick={handleClick}>{i}</a>
  //   )
  // })

  return (
    <>
      <div className={`${style.tr_th} ${customStyle}`}>
        {mode === 'full' && (
          <>
            {useButton ? (
              <>
                <button className={style.th}>
                  <p className={style.text}>{thText}</p>
                  <p className={style.num}>{thNumber}</p>
                </button>
                <button className={style.th_2}>
                  <p className={style.text}>{th2Text}</p>
                  <p className={style.num}>{th2Number}</p>
                </button>
                <button className={style.th_3}>
                  <p className={style.text}>{th3Text}</p>
                  <p className={style.num}>{th3Number}</p>
                </button>
              </>
            ) : (
              <>
                <div className={style.th}>
                  <p className={style.text}>{thText}</p>
                  <p className={style.num}>{thNumber}</p>
                </div>
                <div className={style.th_2}>
                  <p className={style.text}>{th2Text}</p>
                  <p className={style.num}>{thNumber}</p>
                </div>
                <div className={style.th_3}>
                  <p className={style.text}>{th3Text}</p>
                  <p className={style.num}>{th3Number}</p>
                </div>
              </>
            )}
          </>
        )}
        {mode === 'twoTh' && (
          <>
            {useButton ? (
              <>
                {/* {btns} */}
                <a className={style.th} role="button" onClick={handleClickA}>
                  <p className={style.text}>{thText}</p>
                  <p className={style.num}>{thNumber}</p>
                </a>
                <a className={style.th_3} role="button" onClick={handleClickB}>
                  <p className={style.text}>{th3Text}</p>
                  <p className={style.num}>{th3Number}</p>
                </a>
              </>
            ) : (
              <>
                <div className={style.th}>
                  <p className={style.text}>{thText}</p>
                  <p className={style.num}>{thNumber}</p>
                </div>
                <div className={style.th_3}>
                  <p className={style.text}>{th3Text}</p>
                  <p className={style.num}>{th3Number}</p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Headbox
