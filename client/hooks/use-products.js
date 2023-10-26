import axios from 'axios'

const useProducts = () => {
  const API_GET_PRODUCTS = 'http://localhost:3005/api/products'

  const productList = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(API_GET_PRODUCTS)
      return response.data
    } catch (err) {
      throw err
    }
  }
  const productItem = async (pid) => {
    // const API_GET_PRODUCT_BY_ID =
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(
        'http://localhost:3005/api/products/' + pid
      )
      return response.data
    } catch (err) {
      throw err
    }
  }
  const brandItem = async (bid) => {
    // const API_GET_PRODUCT_BY_ID =
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(
        'http://localhost:3005/api/products/brand/' + bid
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  return {
    productList,
    productItem,
    brandItem,
  }
}

export default useProducts
