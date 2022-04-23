// Dependencies
const express = require("express")
const Store = require("./models/store.js")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Routes / Controllers
// New
app.get("/store/new", (req, res) => {
    res.render("new.ejs")
})

// Create
app.post("/store", (req, res) => {
    // if (req.body.completed === "on") {
    //     //if checked, req.body.completed is set to 'on'
    //     req.body.completed = true
    //   } else {
    //     //if not checked, req.body.completed is undefined
    //     req.body.completed = false
    //   }
    Store.create(req.body, (error, createdStore) => {
        res.send(createdStore)
    })
})

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))