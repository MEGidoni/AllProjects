require('dotenv').config();
const router = require('express').Router();
const UsersRouter = require('./UsersRoutes .routes');
const ProductsRouter = require('./ProductsRoutes.routes');


router.use("/user" , UsersRouter );

router.use("/products" , ProductsRouter );










router.use((err, req, res, next) => {

    const errorObj = {};

    if (err.msg) errorObj.msg = err.msg;

    if (err.stack && Object.keys(err.stack).length) errorObj.stack = err.stack;

    if (process.env.MODE == "production" || !Object.keys(errorObj).length) {
        return res.status(err.status ?? 500).send("Error in your environment!")
    }
    
    res.status(err.status ?? 500).json(errorObj)
})


module.exports = router ;