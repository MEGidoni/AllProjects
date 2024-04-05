
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {

        const token = req.cookies.acsses_Token;

        if (!token) {

            return res.status(401).json({ msg: "Token Needed!" });

        }

        const { id, role } = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = { id, role }

        next();

    }

    catch (stack) {
        next({ status: 401 , msg: "token verification failed", stack });
    }

};

const adminAuth = (req, res, next) => {
    try {
        if (!req.user.role === 'admin') return next();
        return next({ msg: "token verification failed", status: 401 });
    } 
    catch (stack) {
        next({ status: 401 , msg: "token verification failed", stack });
    }

};


module.exports = { auth , adminAuth }