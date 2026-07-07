const express = require("express");
const router = express.Router();
const Pelanggan = require("../models/pelanggan");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Pelanggan.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const pelanggan = new Pelanggan(req.body);
    await pelanggan.save();
    res.json(pelanggan);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const data = await Pelanggan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Pelanggan.findByIdAndDelete(req.params.id);
    res.json({ message: "hapus" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;