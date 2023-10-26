import express from "express";
// import multer from "multer";
// import moment from "moment";
// import upload from "multer";
import cors from "cors";
<<<<<<< HEAD
import { getProducts, getProductById } from "./models/products.js";
<<<<<<< HEAD
=======
import { getCampground, getCampgroundById } from "./models/campground.js";
import { getMembers, getMemberById } from "./models/members.js";

>>>>>>> Wang
// import mysql from "mysql2/promise"; // 使用promise版本
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "admin",
//   password: "12345",
//   database: "lazyforest",
//   // 其他連線選項...
// });
=======
import {
  getProducts,
  getProductById,
  getProductsWithQs,
} from "./models/products.js";
import sqlString from "sqlstring";
>>>>>>> Liao

// 設定部份
let whitelist = [
  "http://localhost:5500",
  "http://localhost:3000",
  "http://localhost:3005",
  "http://localhost:3016",
  "http://127.0.0.1:5500",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3005",
  "http://127.0.0.1:3016",
  undefined,
];
let corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
const app = express();
app.use(cors(corsOptions));

app.use(express.json()); //express 的Json格式閱讀
app.use(express.urlencoded({ extended: true }));
// 續路由部份

app.get("/", (req, res) => {
  res.send("首頁");
});

// * 所有商品 *
app.get("/api/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// * 找到特定商品 *
app.get("/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await getProductById(pid);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// * 所有會員 *
app.get("/api/members", async (req, res) => {
  try {
    const members = await getMembers();
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

// * 找到特定會員 *
app.get("/api/members/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const member = await getMemberById(pid);
    res.status(200).json({ member });
  } catch (error) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

// * 所有會員 *
app.get("/api/members", async (req, res) => {
  try {
    const members = await getMembers();
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

// * 找到特定會員 *
app.get("/api/members/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const member = await getMemberById(pid);
    res.status(200).json({ member });
  } catch (error) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
//購物車
app.get("/testcart", async (req, res) => {
  try {
    const carts = await getCarts();
    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching carts" });
  }
});



// app.get('/testcart/:product_id', (req, res) => {
//   const product_id = req.params.product_id;
//   const sql = 'SELECT * FROM product WHERE product_id = ?';
  
//   db.query(sql, product_id, (error, results) => {
//     if (error) throw error;
//     res.json(results);
//   });
// });



=======
app.get("api/products/qs", async (req, res) => {
  // 獲取網頁的搜尋字串
  const { keyword, cat_ids, new_arrival, discount, budget, orderby } =
    req.query;
  // 建立資料庫搜尋條件

  const conditions = [];
  // 關鍵字 keyword 使用 `name LIKE '%keyword%'`
  conditions[0] = keyword
    ? `product_name LIKE ${sqlString.escape("%" + keyword + "%")}`
    : "";
  // 分類，cat_id 使用 `cat_id IN (1, 2, 3, 4, 5)`
  conditions[1] = cat_ids ? `category_id IN (${cat_ids})` : "";
  // 新品，new_arrival
  conditions[2] = new_arrival ? `created_at <= ${today}` : "";
  // 折價 discount
  conditions[3] = discount ? `product_discount != 1` : "";
  // 預算 budget
  conditions[4] = budget ? `product_price <= ${budget}` : "";

  //各條件為AND相接(不存在時不加入where從句中)
  const conditionsValues = conditions.filter((v) => v);

  // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
  const where =
    conditionsValues.length > 0
      ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(" AND ")
      : "";

  // 排序用，預設使用id, asc
  const order = orderby
    ? { [orderby.split(",")[0]]: orderby.split(",")[1] }
    : { id: "asc" };

  try {
    const products = await getProductsWithQs(where, order);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

>>>>>>> Liao
=======
// * 所有營地 *
app.get("/api/campground", async (req, res) => {
  try {
    const campground = await getCampground();
    res.status(200).json({ campground });
  } catch (error) {
    res.status(500).json({ error: "Error fetching campground" });
  }
});
// * 找到特定營地 *
app.get("/api/campground/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const campground = await getCampgroundById(cid);
    res.status(200).json({ campground });
  } catch (error) {
    res.status(500).json({ error: "Error fetching campground" });
  }
});

>>>>>>> Wang
app.listen(3005, () => {
  console.log("server is running");
});
