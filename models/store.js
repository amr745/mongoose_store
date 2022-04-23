const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
})

const Store = mongoose.model("Store", storeSchema)

module.exports = Store