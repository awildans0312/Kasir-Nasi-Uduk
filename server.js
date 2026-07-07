const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET_KEY = "kunci_rahasia_nasi_uduk_yang_aman";

// KONEKSI MONGODB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/penjualan_nasi_uduk")
  .then(() => console.log("✅ MongoDB Terhubung"))
  .catch(err => console.log("❌ Gagal konek MongoDB:", err));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// LOGIN (Menghasilkan Token)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    const token = jwt.sign({ username, role: "admin" }, SECRET_KEY, { expiresIn: '24h' });
    return res.json({ message: "Login berhasil", token: token });
  }
  res.status(401).json({ message: "Login gagal" });
});

// LOGOUT
app.get("/logout", (req, res) => {
  res.json({ message: "Logout berhasil" });
});

// MIDDLEWARE CEK TOKEN (Pengganti Session)
function isLogin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Belum login" });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
}

// Route Utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// API ROUTES
app.use("/api/pelanggan", isLogin, require("./routes/pelangganRoutes"));
app.use("/api/produk", isLogin, require("./routes/produkRoutes"));
app.use("/api/supplier", isLogin, require("./routes/supplierRoutes"));
app.use("/api/transaksi", isLogin, require("./routes/transaksiRoutes"));
app.use("/api/detail", isLogin, require("./routes/detailtransaksiRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));