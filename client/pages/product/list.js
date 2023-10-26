import ProductItem from '@/components/product/product-item'
import ProductMenu from '@/components/product/product-menu'
import ProductFilter from '@/components/product/product-filter'
import Title from '@/components/product/title'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

export default function List() {
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
  const pageRootRef = useRef(null)

  // 各選項的state
  const [keyword, setKeyword] = useState('')
  const [catIds, setCatIds] = useState([]) // 數字陣列
  const [discount, setDiscount] = useState('')
  const [budget, setBudget] = useState('')
  const [newArrival, setNewArrival] = useState('')
  const [brand, setBrand] = useState('')

  // 排序(前面為排序欄位，後面參數asc為從小到大，desc為從大到小排序)
  const [orderby, setOrderby] = useState('id,asc')

  // 最後得到的項目
  const [productsTotal, setProductsTotal] = useState(0)
  const [products, setProducts] = useState([])

  // 載入指示動畫用
  const [loading, setLoading] = useState(false)

  const getProductsQs = async (params) => {
    // 用URLSearchParams產生查詢字串
    const searchParams = new URLSearchParams(params)
    const url = `http://localhost:3005/api/products/qs?${searchParams.toString()}`

    const res = await axios.get(url)

    if (Array.isArray(res.data.data)) {
      // 設定獲取頁數總合
      setProductsTotal(res.data.total)
      // 設定獲取項目
      console.log(res.data)
      setProducts(res.data.data)
    }
  }
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const { keyword, cat_ids, orderby, discount, budget, newArrival, brand } =
        router.query

      console.log(router.query)

      // 設定回所有狀態(注意資料類型，所有從查詢字串來都是字串類型)
      setKeyword(keyword || '')
      setCatIds(cat_ids ? cat_ids.split(',').map((v) => Number(v)) : [])
      setBudget(budget || '')
      setDiscount(discount || '')
      setNewArrival(newArrival || '')
      setOrderby(orderby || 'id,asc')
      setBrand(brand || '')

      // 載入指示動畫
      setLoading(true)
      // 載入資料
      getProductsQs(router.query)
    }

    // 下面省略eslint多餘檢查
    // eslint-disable-next-line

    setLoading(true)
    // 載入資料
    getProductsQs(router.query)
  }, [router.query])

  // 載入指示動畫用: 於0.8s後，自動關閉載入指示動畫
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [loading])

  // ** 分頁 **
  //每一頁 12 筆資料
  const productsPerPage = 12

  // 這裡使用項目偏移量來控制當前頁顯示的項目。
  const [productOffset, setproductOffset] = useState(0)

  // 模擬從其他資源獲取項目。
  const endOffset = productOffset + productsPerPage
  // console.log(`正在載入項目從 ${productOffset} 到 ${endOffset}`)
  const currentproducts = products.slice(productOffset, endOffset)
  const pageCount = Math.ceil(products.length / productsPerPage)

  // 當用戶點擊請求下一頁時調用。
  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length
    // console.log(`用戶請求頁數 ${event.selected}，對應的偏移量為 ${newOffset}`)
    setproductOffset(newOffset)
  }
  useEffect(() => {
    if (pageRootRef.current) {
      // 滾動到根元素的頂部
      pageRootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [productOffset])
  return (
    <>
      <Title />
      <ProductMenu
        brand={brand}
        setBrand={setBrand}
        catIds={catIds}
        setCatIds={setCatIds}
        getProductsQs={getProductsQs}
      />
      <div className="container" ref={pageRootRef}>
        <Toaster />
        <div className="">
          <ProductFilter
            keyword={keyword}
            setKeyword={setKeyword}
            catIds={catIds}
            setCatIds={setCatIds}
            discount={discount}
            setDiscount={setDiscount}
            budget={budget}
            setBudget={setBudget}
            newArrival={newArrival}
            setNewArrival={setNewArrival}
            setLoading={setLoading}
            getProductsQs={getProductsQs}
            orderby={orderby}
            setOrderby={setOrderby}
            router={router}
            setproductOffset={setproductOffset}
          />
        </div>
        {/* 商品卡片 */}
        <ProductItem
          Toaster={Toaster}
          notifyAdd={notifyAdd}
          notifyRemove={notifyRemove}
          notifyAddCart={notifyAddCart}
          notifyLogin={notifyLogin}
          currentproducts={currentproducts}
          loading={loading}
          swalAddCart={swalAddCart}
          swalRemove={swalRemove}
          swalAdd={swalAdd}
        />
        {/* 分頁 */}
        <div className="mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            // page-item
            pageClassName="pageBtn"
            previousClassName="pageBtn goBtn"
            nextClassName="pageBtn goBtn"
            breakClassName="pageBtn"
            //active
            activeClassName="pageActive"
            //container
            containerClassName="pageContainer"
            //link
            pageLinkClassName="pageLink"
            previousLinkClassName="pageLink goLink"
            nextLinkClassName="pageLink goLink"
            breakLinkClassName="pageLink"
          />
        </div>
      </div>
    </>
  )
}
