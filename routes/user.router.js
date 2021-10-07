const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/',userController.getUsers);
router.post('/',userController.createUser);

router.get('/:user_id',userController.getUsersById);
router.delete('/:user_id',userController.deleteUser);

module.exports = router;
