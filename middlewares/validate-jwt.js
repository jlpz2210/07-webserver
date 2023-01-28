const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req=request,res=response,next) => {

    const token = req.header('Authorization');

    if(!token) return res.status(401).json({msg:'Missing token.'})

    try{

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const authenticatedUser = await User.findById(uid);

        if(!authenticatedUser) res.status(401).json({msg:'User does not exist.'})

        if(!authenticatedUser.isActive) res.status(401).json({msg:'Invalid token.'})

        req.user = authenticatedUser;

        next();

    }catch(error){
        res.status(401).json({
            msg:'Invalid token.'
        })
    }

}

module.exports = {
    validateJWT
}