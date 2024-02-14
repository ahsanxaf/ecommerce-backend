const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Products');

// middlewares
server.use(express.json()); // to parse req.body
server.use('/products', productsRouter.router)

main().catch(error=>console.log(error));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB');
    console.log("Database connected")
} 

server.get('/', (req, res) => {
    res.json({status: 'success'})
});

server.listen(8080, () => {
    console.log('Server Started');
})