import Headbox from '@/components/member-center/headbox'
import Title from '@/components/member-center/title'
import SendOTP from '@/components/popup/sendotp'

export default function Head() {
  return (
    <>
      <div className="container mb-5">
        <Title eng_title="POSTS" ch_title="發過的文" />
        <SendOTP />
        <Headbox
          mode="full"
          thText="總發文數"
          thNumber="5"
          th2Text="獲得喜愛次數"
          th2Number="1,294"
          th3Text="獲得留言數"
          th3Number="346"
        />
        <h1 className="m-3" style={{ height: 1200 }}>
          我發的文
        </h1>
      </div>
    </>
  )
}

/*
const Page1 = () => {
  return (
    <div>
      <h1>Page 1</h1>
      <CustomTextComponent customText="這是在頁面1的文字內容" />
    </div>
  );
};

*/
