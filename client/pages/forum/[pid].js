import React from 'react'
import Index from '@/components/post-info/index'

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
