const express = require("express");
const router = express.Router();
const Produk = require("../models/produk");

router.get("/", async (req, res) => {
  res.json(await Produk.find());
});

router.post("/", async (req, res) => {
  const data = new Produk(req.body);
  await data.save();
  res.json(data);
});

router.put("/:id", async (req, res) => {
  res.json(await Produk.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  await Produk.findByIdAndDelete(req.params.id);
  res.json({ message: "hapus" });
});

module.exports = router;