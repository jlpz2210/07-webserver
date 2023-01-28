
const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const {check} = require('express-validator');
const { isValidRole, emailExists, userExistsById } = require('../helpers/db-validators');
const {
    validateFields,
    validateJWT,
    hasRole
} = require('../middlewares');

const router = Router();

router.get('/', usersGet);

router.post('/',[
    check('name','The name is required').not().isEmpty(),
    check('password','The password is required').isLength({min:6}),
    check('email','This email is not valid').isEmail().custom(emailExists),
    // check('role','Role not valid').isIn(['ADMIN','USER']),
    check('role').custom(isValidRole),
    validateFields
],usersPost);

router.put('/:id', [
    check('id', 'The id is not valid').isMongoId().custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields
],usersPut);

router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN'),
    check('id', 'The id is not valid').isMongoId().custom(userExistsById),
    validateFields
] ,usersDelete);

module.exports = router;