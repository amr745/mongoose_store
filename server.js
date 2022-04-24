// Dependencies
const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const Product = require("./models/product")
const app = express()
require("dotenv").config()

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))


// Routes / Controllers
// Seed
const productSeed = require("./models/productSeed.js")
 
app.get("/products/seed", (req, res) => {
    Product.deleteMany({}, (error, allBooks) => {
    })

    Product.create(productSeed, (error, data) => {
        res.redirect("/products")
    })
})

// Index
app.get("/products", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        })
    })
})

// New
app.get("/products/new", (req, res) => {
    res.render("new.ejs")
})

// Delete
app.delete("/products/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/products")
    })
})

// Update
app.put("/products/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
        (error, updatedProduct) => {
          res.redirect(`/products/${req.params.id}`)
        }
    )
})

// Create
app.post("/products", (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect("/products")
    })
})

// Edit
app.get("/products/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
      res.render("edit.ejs", {
        product: foundProduct,
        })
    })
})

/// Show
app.get("/products/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
      res.render("show.ejs", {
        product: foundProduct,
      })
    })
  })

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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