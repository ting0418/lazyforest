import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Burger() {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)
    useEffect(() => {
      const media = window.matchMedia(query)
      if (media.matches !== matches) {
        setMatches(media.matches)
      }
      const listener = () => setMatches(media.matches)
      window.addEventListener('resize', listener)
      return () => window.removeEventListener('resize', listener)
    }, [matches, query])

    return matches
  }
  const isMobile = useMediaQuery('(max-width: 450px)')

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isMobile ? (
        <Menu
          isOpen={isOpen}
          onOpen={() => {
            setIsOpen(true)
          }}
          onClose={() => {
            setIsOpen(false)
          }}
        >
          <Link
            className="menu-item"
            href="/camp/category"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            營地預約
          </Link>
          <Link
            className="menu-item"
            href="/product"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            裝備販售
          </Link>
          <Link
            className="menu-item"
            href="/forum/post-list"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            討論區
          </Link>
          <Link
            className="menu-item"
            href="/member-dashboard"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            會員中心
          </Link>
        </Menu>
      ) : (
        ''
      )}
    </>
  )
}