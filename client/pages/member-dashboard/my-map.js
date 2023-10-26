import Mymap from '@/components/member-center/my-map'
import ChangePwd from '@/components/popup/change-password'

export default function Map() {
  return (
    <div className="container">
      <Mymap />
      <ChangePwd />
    </div>
  )
}
