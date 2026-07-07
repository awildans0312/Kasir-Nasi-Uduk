const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nama: { type: String, required: true },
  kategori: String,
  harga: { type: Number, required: true },
  stok: { type: Number, default: 0 },
  varian: String
}, {
  collection: "produk"
});

module.exports = mongoose.model("Produk", schema);