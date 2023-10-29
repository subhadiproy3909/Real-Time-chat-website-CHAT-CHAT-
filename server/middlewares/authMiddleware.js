const jwt = require('jsonwebtoken');
const user = require('../database/Models/userModel');


// const auth = async(req, res, next) =>{
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         try{
//             token = req.headers.authorization.split(" ")[1];

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await user.findById(decoded.id).select("-password");

//             next();
//         }
//         catch(error){
//             res.status(401);
//             throw new Error("Not authorized, token failed");
//         }
//     }

//     if(!token){
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// }

const auth = async (req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decoded.id).select("-password");

            next();
        }
        catch(error){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}


module.exports = {auth};