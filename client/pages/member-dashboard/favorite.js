import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Headbox from '@/components/member-center/headbox'
import Title from '@/components/member-center/title'
import Card from '@/components/camp/Card'
import ProductItem from '@/components/product/product-item'
import Swal from 'sweetalert2'
import { Row } from 'react-bootstrap'
import { wrap } from 'lodash'

export default function Favorite() {
  const [selectedOption, setSelectedOption] = useState('商品') // 預設商品
  const [campground, setCampground] = useState([])
  const [products, setProducts] = useState([])
  const [productCount, setProductCount] = useState(0)
  const [campgroundCount, setCampgroundCount] = useState(0)

  const handleOptionClick = (option) => {
    console.log({ option })
    setSelectedOption(option)
  }

  const notifyAdd = () =>
    toast.success('已加入收藏', {
      style: {
        border: '1px solid #3E3B35',
        padding: '16px',
        color: '#3E3B35',
      },
      iconTheme: {
        primary: '#D1EF1A',
        secondary: '#3E3B35',
      },
    })
  const notifyRemove = () =>
    toast.success('已移除收藏', {
      style: {
        border: '1px solid #3E3B35',
        padding: '16px',
        color: '#3E3B35',
      },
      iconTheme: {
        primary: '#D1EF1A',
        secondary: '#3E3B35',
      },
    })
  const notifyAddCart = () =>
    toast.success('已加入購物車', {
      style: {
        border: '1px solid #3E3B35',
        padding: '16px',
        color: '#3E3B35',
      },
      iconTheme: {
        primary: '#D1EF1A',
        secondary: '#3E3B35',
      },
    })
  const notifyLogin = () =>
    toast.success('請先登入', {
      style: {
        border: '1px solid #3E3B35',
        padding: '16px',
        color: '#3E3B35',
      },
      iconTheme: {
        primary: '#D1EF1A',
        secondary: '#3E3B35',
      },
    })

  // 載入指示動畫用
  const [loading, setLoading] = useState(false)

  const swalAdd = () => {
    Swal.fire({
      timer: 1000,
      title: '已加入收藏',
      // text: '繼續看看其他商品吧！',
      icon: 'success',
      showConfirmButton: false,
    })
  }
  const swalRemove = () => {
    Swal.fire({
      timer: 1000,
      title: '已移除收藏',
      // text: '繼續看看其他商品吧！',
      icon: 'warning',
      showConfirmButton: false,
    })
  }
  const swalAddCart = () => {
    Swal.fire({
      timer: 1000,
      title: '已加入購物車',
      text: '繼續看看其他商品吧！',
      icon: 'success',
      showConfirmButton: false,
    })
  }

  useEffect(() => {
    const loadProductList = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/favorite/fav-products',
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }
        )

        const data = await response.json()
        console.log('loadProductList()', data)
        const productCount = data.products.length
        setProductCount(productCount)
        setProducts(data.products)
      } catch (error) {
        console.log({ error })
      }
    }

    loadProductList()
  }, [])

  useEffect(() => {
    const loadCampList = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/favorite/fav-campground',
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }
        )

        const data = await response.json()
        console.log('loadCampList()', data)
        const campgroundCount = data.campground.length
        setCampgroundCount(campgroundCount)
        setCampground(data.campground)
      } catch (error) {
        console.log({ error })
      }
    }

    loadCampList()
  }, [])

  return (
    <>
      <div className="container">
        <Title eng_title="WISH LIST" ch_title="我的收藏" />
        <Headbox
          mode="twoTh"
          thText="收藏商品"
          thNumber={productCount}
          th3Text="收藏營地"
          th3Number={campgroundCount}
          useButton={true} // 使用按鈕
          onClick={handleOptionClick}
          // items={['a', 'b', 'c']}
        />
      </div>

      {selectedOption === '商品' ? (
        // 商品收藏
        <div className="container">
          {/* <h1>商品收藏頁面</h1> */}
          {/* 商品卡片 */}

          <ProductItem
            Toaster={Toaster}
            notifyAdd={notifyAdd}
            notifyRemove={notifyRemove}
            notifyAddCart={notifyAddCart}
            notifyLogin={notifyLogin}
            currentproducts={products}
            loading={loading}
            swalAddCart={swalAddCart}
            swalRemove={swalRemove}
            swalAdd={swalAdd}
          />
        </div>
      ) : (
        // 營地收藏
        <div
          className="container"
          // style={{
          //   display: 'flex',
          //   flexDirection: 'row',
          //   flexWrap: 'wrap',
          //   gap: '20px',
          //   alignContent: 'center',
          //   width: '100%',
          // }}
        >
          <div className="row">
            {/* <h1>營地收藏頁面</h1> */}
            {campground.map((campData, index) => (
              <div className="col-6 mb-5 d-flex justify-content-center">
                <Card
                  id={campData.id}
                  key={index}
                  camp_img={campData.camp_img}
                  camp_name={campData.camp_name}
                  camp_address={campData.camp_address}
                  wifi={campData.wifi}
                  food={campData.food}
                  group={campData.group}
                  swimming={campData.swimming}
                  rent={campData.rent}
                  fishing={campData.fishing}
                  stream={campData.stream}
                  firefly={campData.firefly}
                  view={campData.view}
                  tub={campData.tub}
                  rating={campData.rating}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
