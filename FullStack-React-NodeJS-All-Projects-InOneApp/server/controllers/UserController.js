const { getUserByEmail, createUser , getUserById } = require("../services/UserSrvice")
const { hash , compare } = require("bcrypt");
const jwt = require('jsonwebtoken');
const { auth } = require("../middleWares/auth");

const userCTRL = {

        async register({ body }, res, next) {
            try {
                const user = await getUserByEmail(body.email);
                if (user) {
                    return next({ status: 409, msg: "User alrady registered" });
                }
                body.password = await hash(body.password, 5)
                const [isCreated] = await createUser(body);
                if (!isCreated) return next(true);
                return res.status(201).json({msg:"thank you for registering!",user_data:await getUserByEmail(body.email)});
                }
            catch (stack) {
                next({ stack });
            }
        },
        
    async login({body}, res, next) {
        try {
            const user = await getUserByEmail(body.email);

            if(!user){
                return next({status:404 ,msg: 'username or password incorrect!'});
            }

            const password = await compare(body.password,user.password);

            if(!password){
                return next({status:401 ,msg: 'username or password incorrect!'});
            }

            const acssesToken = jwt.sign({id:user.id,role:user.role},process.env.TOKEN_SECRET,{expiresIn:"30d"});
            delete user.password;

            res.cookie( "acsses_Token" , acssesToken , { httpOnly:true , sameSite: "none" , secure: true } ).status(200).json({msg:"logged in!",user});


        }
        catch (stack) {
            next({ stack });
        }
    },
    async getUserInfo({user:{id}},res,next){
        try {
            const user = await getUserById(id);
            return res.status(200).json({msg:"success authenticated",user});
        } catch (stack) {
            next({ stack });
        }
    },
    async logout (req, res, next){
        try {
           res.status(200).clearCookie("acsses_Token").send({msg:"logout successfuly"});
        } 
        catch (stack) {
            next({ stack });
        }
    
    }
}
module.exports = userCTRL