const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, logInMiddleware, userIdMiddleware} = require('../middlewares');

router.post(
    '/',
    userMiddleware.isUserValid,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.use(logInMiddleware.checkAccessToken,userMiddleware.isUserActive);

router.get(
    '/',
    userController.getUsers
);

router.get(
    '/:user_id',
    userIdMiddleware.userIdMiddleware,
    userController.getUsersById
);
router.put(
    '/:user_id',
    logInMiddleware.checkAccessToken,
    userIdMiddleware.updateValid,
    userIdMiddleware.userIdMiddleware,
    userController.updateUser
);
router.delete(
    '/:user_id',
    logInMiddleware.checkAccessToken,
    userController.deleteAccount
);

module.exports = router;
