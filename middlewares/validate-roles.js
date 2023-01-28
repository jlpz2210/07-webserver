const { request, response } = require("express");


const isAdmin = (req = request, res = response, next) => {

    if(!req.user) return res.status(500).json({msg:'Error validating role'});

    const {role} = req.user;

    if(role!=='ADMIN') return res.status(401).json({msg:'User not allowed.'})

    next();

}

const hasRole = ( ...roles ) => {

    return (req,res,next) => {

        if(!req.user) return res.status(500).json({msg:'Error validating role'});

        if(!roles.includes(req.user.role)) res.status(401).json({msg:'User not allowed.'})

        next();
    }

}

module.exports = {
    isAdmin,
    hasRole
}