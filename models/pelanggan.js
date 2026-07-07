const mongoose = require("mongoose");

const pelangganSchema = new mongoose.Schema({
    nama: String,
    alamat: String,
    no_hp: String
}, {
    collection: "pelanggan" // PAKSA NAMA KOLEKSI TANPA HURUF 'S'
});

module.exports = mongoose.model("Pelanggan", pelangganSchema);