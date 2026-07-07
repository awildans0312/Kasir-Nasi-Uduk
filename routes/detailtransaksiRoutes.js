const express = require("express");
const router = express.Router();
const Detail = require("../models/detailTransaksi");

// GET ALL
router.get("/", async (req, res) => {
  res.json(await Detail.find());
});

// CREATE
router.post("/", async (req, res) => {
  const data = new Detail(req.body);
  await data.save();
  res.json(data);
});

// DELETE by transaksi (biar bersih kalau transaksi dihapus)
router.delete("/byTransaksi/:id", async (req, res) => {
  await Detail.deleteMany({ id_transaksi: req.params.id });
  res.json({ message: "detail terhapus" });
});

module.exports = router;