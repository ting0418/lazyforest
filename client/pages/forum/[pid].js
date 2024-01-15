// import React from 'react'
import Index from '@/components/post-info/index'
// import { useRouter } from 'next/router'
export default function PostInfo({ id }) {
  return (
    <>
      <Index pid={id} />
    </>
  )
}
export async function getServerSideProps(context) {
  const { pid } = context.params
  return {
    props: {
      pid,
    },
  }
}

// export default function PostInfo() {
//   const router = useRouter()
//   const { pid } = router.query

// return (
//   <div>
//     <Index pid={pid} />
//   </div>
// )
// }
