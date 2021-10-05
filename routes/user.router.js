const router  = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/',userController.getUsers);

router.get('/:user_id',userController.getUsersById);

router.post('/',userController.createUser);

router.delete('/:user_id',userController.deleteUser);

module.exports = router;