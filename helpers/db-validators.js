const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async ( role = '' )=>{
    const roleExists = await Role.findOne({role});
    if(!roleExists) throw new Error(`The role ${role} does not exist.`)
}

const emailExists = async ( email = '') =>{
    const emailExists = await User.findOne({email});
    if(emailExists) throw new Error(`The email ${email} is already taken.`)
}

const userExistsById = async ( id ) =>{
    const userExists = await User.findById(id);
    if(!userExists) throw new Error(`The user with id ${id} doesn't exist.`)
}

module.exports = {isValidRole, emailExists, userExistsById}