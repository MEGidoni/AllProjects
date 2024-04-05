const { getProductsByUser, addProduct, getProductById, getProductByProductNameAndByUserId, removeProductById, getProductsById, changeProductService } = require("../services/ProductSevices");
const { getUserByEmail, createUser, getUserById } = require("../services/UserSrvice")


const productCTRL = {

    async addProductService({ body }, res, next) {
        try {
            const product = await getProductByProductNameAndByUserId(body.product_name, body.user_id);
            if (product) {
                return next({ status: 409, msg: "product is alrady in your cart!" });
            }
            const [isAdded] = await addProduct(body);
            if (!isAdded) return next(true);
            return res.status(201).json({ msg: "Product added!", product_data: body });
        }
        catch (stack) {
            next({ stack });
        }
    },

    async deleteProduct(req, res, next) {
        try {
            const y = await getProductsById(req.body.id);
            if (y.length < 1) {
                return res.status(404).json({ msg:"no such product"});
            }
            else {
                await removeProductById(req.body.id);
                res.status(200).json({ msg: "Product deleted" });
            }
        }
        catch (stack) {
            next({ stack });
        }
    },
    async getProducts(req, res, next) {
        const userId = req.query.userId;
        try {
            const products = await getProductsByUser(userId);
            res.status(200).json({ msg: "success user authenticated and pull products", products });
        } catch (stack) {
            next({ stack });
        }
    },
    async changeProduct(req, res, next) {
        try {
            const y = await getProductsById(req.body.id);
            if (y.length < 1) {
                return res.status(404).json({ msg:"no such product"});
            }
            else {
                req.older=y[0];
                req.meg={older:req.older,product:req.body}
                await changeProductService(req.meg);
                res.status(200).json({ msg: "Product updated" });
            }
        }
        catch (stack) {
            next({ stack });
        }
    }
}
module.exports = productCTRL