const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "rahasia_nasi_uduk",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// KONEKSI MONGODB (TAMBAHKAN INI)
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/penjualan_nasi_uduk")
  .then(() => console.log("✅ MongoDB Terhubung ke penjualan_nasi_uduk"))
  .catch(err => console.log("❌ Gagal konek MongoDB:", err));

// Serve static files (public folder)
app.use(express.static(path.join(__dirname, "public")));

// Auth Routes
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    req.session.user = { username, role: "admin" };
    return res.json({ message: "Login admin berhasil" });
  }
  res.status(401).json({ message: "Login gagal" });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout berhasil" });
  });
});

// Middleware Proteksi API
function isLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: "Belum login" });
  next();
}

// Route Utama Halaman
app.get("/", (req, res) => {
  if (!req.session.user) return res.sendFile(path.join(__dirname, "public/login.html"));
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API ROUTES (Gunakan Middleware isLogin di sini)
// GUNAKAN INI:
app.use("/api/pelanggan", isLogin, require("./routes/pelangganRoutes"));
app.use("/api/produk", isLogin, require("./routes/produkRoutes"));
app.use("/api/supplier", isLogin, require("./routes/supplierRoutes"));
app.use("/api/transaksi", isLogin, require("./routes/transaksiRoutes"));
app.use("/api/detail", isLogin, require("./routes/detailtransaksiRoutes"));


const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));