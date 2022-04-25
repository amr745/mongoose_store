// Dependencies
const express = require("express")
const productRouter = express.Router()
const Product = require("../models/product")

// Routes / Controllers
// Seed
const productSeed = require("../models/productSeed")
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allBooks) => {
    })

    Product.create(productSeed, (error, data) => {
        res.redirect("/products")
    })
})

// Index
productRouter.get("/", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        })
    })
})

// New
productRouter.get("/new", (req, res) => {
    res.render("new.ejs")
})

// Delete
productRouter.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/products")
    })
})

// Update
productRouter.put("/:id", (req, res) => {
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
//Buy
productRouter.put("/buy/:id", (req, res) => {
    Product.findById(req.params.id, (err, boughtProduct) => {
        let productQty = boughtProduct.qty;
        let updatedQty = productQty - req.body.qty;
        req.body.qty = updatedQty;
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err, updatedProduct) => {
            if (err) return res.send(err);
            res.redirect(`/products/${req.params.id}`);
        })
    })
});

// Create
productRouter.post("/", (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect("/products")
    })
})

// Edit
productRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
      res.render("edit.ejs", {
        product: foundProduct,
        })
    })
})

/// Show
productRouter.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("show.ejs", {
            product: foundProduct,
        })
    })
})

// Exports
module.exports = productRouter