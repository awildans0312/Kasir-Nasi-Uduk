const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nama: String,
  nama_perusahaan: String,
  no_hp: String,
  alamat: String
}, {
  collection: "supplier" // <- DIPERBAIKI DI SINI
});

module.exports = mongoose.model("Supplier", schema);