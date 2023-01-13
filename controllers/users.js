const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req,res = response) =>{

    const {limit = 5, offset = 0} = req.query;

    const query = { isActive:true };

    const [total,data] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(offset).limit(limit)
    ]);

    res.json({
        total,
        data
    });
}

const usersPost = async (req,res = response)=>{

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    await user.save();

    res.json(user);
}

const usersPut = async (req = request,res = response)=>{

    const {id} = req.params;
    const { _id, password, google, ...rest } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id,rest);

    res.json(user);
}

const usersDelete = async (req,res = response)=>{

    const {id} = req.params;
    
    const user = await User.findByIdAndUpdate(id, {isActive:false});
    
    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}