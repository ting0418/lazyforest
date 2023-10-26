// 資料庫查詢處理函式
import {
  find,
  findOneById,
  insertMany,
  cleanTable,
  count,
  updateById,
  findComments,
  insertOne,
} from './base.js'

// 定義資料庫表格名稱
const table = 'forum'

// 所需的資料處理函式
// 查詢所有資料
const getForums = async () => {
  const { rows } = await find(table)
  return rows
}

const getForumsWithQS = async (where = '', order = {}, limit = 0, offset) => {
  const { rows } = await find(table, where, order, limit, offset)
  return rows
}

// 查詢總數用，加入分頁與搜尋字串功能
const countWithQS = async (where = '') => {
  return await count(table, where)
}

// 查詢單一資料，使用id
const getForumById = async (id) => await findOneById(table, id)
const getCommentsWithQS = async (where = '', order = {}, limit = 0, offset) => {
  const result = await findComments(where, order, limit, offset)
  return result
}
// 新增發文
const createUser = async (user) => await insertOne(table, user)
const getCount = async (where) => await count(table, where)
// 建立大量商品資料用
const createBulkForums = async (users) => await insertMany(table, users)

// 更新put
const updateUserById = async (user, id) => await updateById(table, user, id)
const updateUser = async (user) => await updateById(table, user, user.id)
// 其它用途
// 清除表格資料
const cleanAll = async () => await cleanTable(table)

export {
  updateUserById,
  updateUser,
  getForums,
  getForumsWithQS,
  getForumById,
  createBulkForums,
  cleanAll,
  countWithQS,
  getCommentsWithQS,
  createUser,
  getCount,
}
