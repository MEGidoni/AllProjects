const knex = require("../db/knexConfig");

const ProductServ = {

    getProductsByUser(userId) {
        return knex("products").select("*").where('user_id', userId);
    },
    getProductsById(id) {
        return knex("products").select("*").where('id', id);
    },
    getProductByProductNameAndByUserId(product_name, userId) {
        return knex("products").select("*").where('product_name', product_name).andWhere("user_id", userId).first();
    },

    addProduct(product) {
        const matter = {
            id: product.id,
            amount: product.amount,
            product_name: product.product_name,
            user_id: product.user_id,
            is_taken: product.is_taken
        }
        return knex("products").insert(matter);
    },

    changeProductService(meg) {
        const { id, newName, newAmount, new_is_taken } = meg.product;
        const { product_name, amount, is_taken } = meg.older;
        return knex('products').where("id", id ).update({
            product_name: newName?newName:product_name,
            amount: newAmount?newAmount:amount,
            is_taken: new_is_taken!=undefined?new_is_taken:is_taken,
            is_bought: new_is_taken!=undefined?new_is_taken:is_taken
        });
    },

    removeProductById(productId) {
        console.log(productId, "deleted");
        return knex("products").delete("*").where("id", productId);
    }
}

module.exports = ProductServ;