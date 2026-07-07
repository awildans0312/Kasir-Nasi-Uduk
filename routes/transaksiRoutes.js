const express = require("express");
const router = express.Router();
const Transaksi = require("../models/transaksi");

// GET ALL
router.get("/", async (req, res) => {
  res.json(await Transaksi.find());
});

// CREATE
// CREATE
router.post("/", async (req, res) => {
  try {
    // Kita buat objek baru dan isi SATU PER SATU agar tidak ketolak sama schema lama
    const data = new Transaksi();
    data.pelangganNama = req.body.pelangganNama || "Umum";
    data.total = req.body.total;
    data.metodePembayaran = req.body.metodePembayaran;
    data.bayar = req.body.bayar || 0;
    data.kembalian = req.body.kembalian || 0;
    
    await data.save();
    res.json(data);
  } catch (err) {
    console.error("Error saat simpan transaksi:", err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await Transaksi.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Transaksi.findByIdAndDelete(req.params.id);
  res.json({ message: "hapus" });
});

module.exports = router;