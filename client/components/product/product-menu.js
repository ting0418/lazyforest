import React from 'react'
import ProductMenuData from '@/data/product/product-menu'
import styles from '@/components/product/product-menu.module.scss'
import Link from 'next/link'

export default function ProductMenu() {
  return (
    <div className={`${styles['nested-menu']}`}>
      {/* 
    熱門商品、商品種類、品牌
     */}
      {ProductMenuData.map((menuItem, index) => (
        <div key={index} className={`${styles['menu-item']} `}>
          <Link
            href={menuItem.url}
            style={{ textDecoration: 'none' }}
            className={`${styles['menu-item-label']} ${styles.TopMenuLink}`}
          >
            {menuItem.label}
          </Link>
          {menuItem.children && (
            <div className={`${styles['submenu']}`}>
              {/* 
              第一層 
              SUB MENU ITEM 
              */}
              {menuItem.children.map((submenuItem, subIndex) => (
                <div key={subIndex} className={styles['submenu-item']}>
                  <Link
                    href={submenuItem.url}
                    style={{ textDecoration: 'none' }}
                    className={`${styles.SubMenuLink}`}
                  >
                    {submenuItem.label}
                  </Link>
                  {submenuItem.children && (
                    <div className={`${styles['sub-submenu']}`}>
                      {/* 
                    第二層
                    SUB SUB MENU ITEM
                     */}
                      {submenuItem.children.map(
                        (subSubmenuItem, subSubIndex) => (
                          <div
                            key={subSubIndex}
                            className={styles['sub-submenu-item']}
                          >
                            <Link
                              href={subSubmenuItem.url}
                              style={{ textDecoration: 'none' }}
                              className={`${styles.SubSubMenuLink}`}
                            >
                              {subSubmenuItem.label}
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
