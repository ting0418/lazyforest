import { useCart } from '@/hooks/use-cart'
import List from '@/components/cart/list'
import Link from 'next/link'

// cart init
// initialState = {
//   items: [],
//   isEmpty: true,
//   totalItems: 0,
//   cartTotal: 0,
// }

export default function CartTest() {
  //可從useCart中獲取的各方法與屬性，參考README檔中說明
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne,
  } = useCart()

  return (
    <>
      <h1>購物車範例</h1>
      <p>
        <Link href="/cart-test/product-list">商品列表頁範例</Link>
      </p>
      <p>
        <Link href="/cart-test/coupon">折價券範例</Link>
      </p>

      {/* 列出cart中清單 */}
      <h4>購物車列表</h4>
      <List />
      {/* 以下為測試按鈕 */}
      <h4>測試按鈕</h4>
      <div className="btn-group-vertical">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            console.log(cart)
          }}
        >
          log cart
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '1',
              img: 'https://cdn.store-assets.com/s/712290/i/55064053.jpeg',
              quantity: 5,
              name: '法國【EiDER】戶外輕量透氣漁夫帽',
              price: 2052,
              color: 'red',
              size: '',
            })
          }}
        >
          add item (id=1, x5)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '2',
              img: 'https://cdn.store-assets.com/s/712290/i/62998933.jpeg',
              quantity: 1,
              name: '法國【EiDER】女防水GTX透氣免帶式短筒鞋',
              price: 6280,
              color: '',
              size: '',
            })
          }}
        >
          add item (id=2, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            removeItem('2')
          }}
        >
          remove item(id=2)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItem({
              id: '2',
              quantity: 7,
            })
          }}
        >
          update id=2 item quantity to 7
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItem({
              id: '1',
              quantity: 99,
            })
          }}
        >
          update id=1 item quantity to 99
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            clearCart()
          }}
        >
          clear cart
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            if (isInCart('2')) alert('id=2 item is in cart')
            else alert('no id=2  ')
          }}
        >
          check if id=2 in cart
        </button>
      </div>
    </>
  )
}
