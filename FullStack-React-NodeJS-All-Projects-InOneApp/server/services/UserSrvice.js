const knex  = require("../db/knexConfig");

const User_Serv = {

    getUserByEmail(email) {

        return knex("users").select("*").where('email',email).first();

    },

    createUser(user){
        return knex("users").insert(user);
    },

    getUserById(id){
        return knex("users").select("id","name","email","role","phone_number").where('id',id).first();
    }
}

module.exports = User_Serv;