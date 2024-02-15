const express = require("express");
const { addToCart, fetchCartByUser, removeFromCart, updateCart } = require("../controller/Cart");

const router = express.Router();

// cart is already added in base path
router
    .post("/", addToCart)
    .get("/", fetchCartByUser)
    .delete("/:id", removeFromCart)
    .patch("/:id", updateCart);

exports.router = router;
