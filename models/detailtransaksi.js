const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id_transaksi: String,
  nama_produk: String,
  harga: Number,
  qty: Number,
  subtotal: Number
}, {
  collection: "detail_transaksi"
});

module.exports = mongoose.model("DetailTransaksi", schema);