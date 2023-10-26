import mysql from "mysql2/promise"; // 使用promise版本
import sqlString from "sqlstring";
const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "12345",
  database: "lazyforest",
  // 其他連線選項...
});

const getMembers = async () => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.query("SELECT * FROM members");
    connection.release(); // 釋放連線回連線池
    return results;
  } catch (error) {
    throw error;
  }
};

const getMemberById = async (pid) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.query(
      `SELECT
      *
      FROM members
      WHERE member_id = ${pid}`
    );
    connection.release(); // 釋放連線回連線池
    return results;
  } catch (error) {
    throw error;
  }
};

export { getMembers, getMemberById };
