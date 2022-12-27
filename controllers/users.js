const { request, response } = require('express');


const usersGet = (req,res = response) =>{

    const queryParams = req.query;

    res.json({
        msg:'get',
        queryParams
    })
}

const usersPost = (req,res = response)=>{

    const body = req.body;

    res.json({
        msg:'post',
        body
    });
}

const usersPut = (req = request,res = response)=>{

    const {id} = req.params;

    res.json({
        msg:'put',
        id
    });
}

const usersDelete = (req,res = response)=>{
    res.json({
        msg:'delete'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}