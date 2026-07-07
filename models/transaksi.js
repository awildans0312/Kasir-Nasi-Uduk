const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        default: Date.now
    },
    pelangganNama: {
        type: String,
        default: "Umum"
    },
    total: Number,
    metodePembayaran: {
        type: String,
        enum: ["Cash", "Card"], 
        default: "Cash"
    },
    bayar: Number,
    kembalian: Number
}, {
    collection: "transaksi"
});

module.exports = mongoose.model("Transaksi", transaksiSchema);