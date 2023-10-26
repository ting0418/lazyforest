import React from 'react'
import style from '@/components/member-center/title.module.scss'

const Title = (props) => {
    return (
        <>
            <div>
                <div className={style.title_wrap}>
                    <p className={style.title}><span className={style.text_din}>{props.eng_title}</span><span className={style.span}>｜</span><span className={style.text_ibm}>{props.ch_title}</span></p>
                </div>
            </div>
            
        </>
    )
}

export default Title

/*
const CustomTextComponent = (props) => {
  return (
    <div>
      <p>{props.customText}</p>
    </div>
  );
}; 
*/