import mysql from "mysql2/promise"; // 使用promise版本
import sqlString from "sqlstring";
const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "12345",
  database: "lazyforest",
  // 其他連線選項...
});

const whereSql = (objOrString, separator = "AND") => {
  if (typeof objOrString === "string") return objOrString;

  if (isEmpty(objOrString)) return "";

  const where = [];
  for (const [key, value] of Object.entries(objOrString)) {
    where.push(`${key} = ${sqlString.escape(value)}`);
  }

  return `WHERE ${where.join(` ${separator} `)}`;
};

const orderbySql = (obj) => {
  if (isEmpty(obj)) return "";

  const orderby = [];

  for (const [key, value] of Object.entries(obj)) {
    orderby.push(`${key} ${value}`);
  }

  return `ORDER BY ${orderby.join(", ")}`;
};

const getProducts = async () => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.query("SELECT * FROM products");
    connection.release(); // 釋放連線回連線池
    return results;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (pid) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.query(
      `SELECT
      *
      FROM products
      WHERE product_id = ${pid}`
    );
    connection.release(); // 釋放連線回連線池
    return results;
  } catch (error) {
    throw error;
  }
};
<<<<<<< HEAD
export { getProducts, getProductById };
=======

const getProductsWithQs = async (where, order) => {
  const sql = sqlString.format(
    `SELECT * FROM products ${whereSql(where)} ${orderbySql(order)}`
  );
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.query(sql);
    connection.release(); // 釋放連線回連線池
    return results;
  } catch (error) {
    throw error;
  }
};

export { getProducts, getProductById, getProductsWithQs };
>>>>>>> Liao
