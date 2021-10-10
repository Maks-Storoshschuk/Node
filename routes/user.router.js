const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');
const logInMiddleware = require('../middlewares/logIn.middleware');
const userIdMiddleware = require('../middlewares/userId.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userIdMiddleware.userIdMiddleware, userController.getUsersById);
router.post('/:user_id', userIdMiddleware.userIdMiddleware, userController.updateUser);
router.delete('/:user_id', userIdMiddleware.userIdMiddleware, userController.deleteUser);
router.post('/auth', logInMiddleware.logInMiddleware, authController.auth);

module.exports = router;
