const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware= require('../middlewares/user.middleware');

router.get('/',userController.getUsers);
// router.post('/',userMiddleware.createUserMiddleware,userController.createUser);

router.get('/:user_id',userController.getUsersById);
router.delete('/:user_id',userController.deleteUser);
router.post('/:auth',userMiddleware.logInMiddleware,userController.auth);

module.exports = router;
