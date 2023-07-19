const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res) => {
    const {id_token} = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token)

        let user = await User.findOne({email})
        if(!user){
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true,
                role: 'USER'
            }
            user = new User(data)
            await user.save()
        }

        if(!user.isActive){
            return res.status(401).json({
                msg: 'User inactive'
            })
        }

        const token = await generateJWT(user.id)


        res.json({
            user,
            token
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "The token couldn't be verified"
        })
    }

    res.json({
        msg: 'Token',
        id_token
    })
}

module.exports = {
    login,
    googleSignIn
}