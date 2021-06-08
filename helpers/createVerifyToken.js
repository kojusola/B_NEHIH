require('dotenv').config();
const jwt = require('jsonwebtoken');

const createAccessJWT = async ( users) =>{
    try{
        const accessJWT = await jwt.sign({ users }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"60m"});
        return Promise.resolve (accessJWT);

    }catch(error){
        return Promise.reject (error);
    }
};

const verifyAccessToken = function (userJWT){
    try{
        return Promise.resolve(jwt.verify(userJWT,  process.env.ACCESS_TOKEN_SECRET));
    } catch (error){
        return Promise.resolve(error);
    }
};


module.exports = {
    createAccessJWT,
    verifyAccessToken
}