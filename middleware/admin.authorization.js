const { verifyAccessToken } = require('../helpers/createVerifyToken');


 const verifyToken = async function (req,res,next){
     const { authorization } = req.headers;
    //  console.log(authorization);
    const decoded = await verifyAccessToken(authorization);
    if(decoded.users){
        const userId = await decoded.users
        req.userId = await userId
        // console.log(req.userId)
        return  next();
     }
    return res.status(403).json({msg:"Forbidden"})
     
};


module.exports={
    verifyToken
}