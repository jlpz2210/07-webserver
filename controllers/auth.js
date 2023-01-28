const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const {email,password} = req.body;

    try{

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                msg:'User/Password not valid.'
            })
        }

        if(!user.isActive){
            return res.status(400).json({
                msg:'User inactive.'
            })
        }

        const validPassword = bcryptjs.compareSync(password,user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg:'Incorrect password.'
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            token
        })

    }catch(error){
        return res.status(500).json({
            msg:'Error'
        })
    }
}

module.exports = {
    login
}