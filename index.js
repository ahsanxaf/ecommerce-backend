const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const cors = require('cors');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Carts');

// middlewares
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
server.use(express.json()); // to parse req.body
server.use('/products', productsRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/categories', categoriesRouter.router)
server.use('/users', usersRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', cartRouter.router)

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