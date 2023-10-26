import { useEffect } from 'react'
import '@/styles/globals.scss'
import '@/styles/product.scss'
import '@/styles/cart.scss'
import '@/styles/burger-menu.scss'
import DefaultLayout from '@/components/layout/default-layout'
import { CartProvider } from '@/hooks/use-cart'
import { AuthProvider } from '@/hooks/use-auth'
import { AuthProviderJWT } from '@/hooks/use-auth-jwt'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`(或components/layout/default-layout.js)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <AuthProviderJWT>
      <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
    </AuthProviderJWT>
  )
  // return (
  //   <AuthProviderJWT>
  //     <AuthProvider>
  //       <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
  //     </AuthProvider>
  //   </AuthProviderJWT>
  // )
}
