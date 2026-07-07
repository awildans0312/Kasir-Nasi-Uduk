const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplier");

router.get("/", async (req, res) => {
  res.json(await Supplier.find());
});

router.post("/", async (req, res) => {
  const data = new Supplier(req.body);
  await data.save();
  res.json(data);
});

router.put("/:id", async (req, res) => {
  res.json(await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({ message: "hapus" });
});

module.exports = router;