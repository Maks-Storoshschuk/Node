const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, logInMiddleware, userIdMiddleware,fileMiddleware} = require('../middlewares');

router.post(
    '/',
    userMiddleware.isUserValid,
    fileMiddleware.checkUserAvatar,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.use(logInMiddleware.checkAccessToken, userMiddleware.isUserActive);

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
    userIdMiddleware.updateValid,
    userIdMiddleware.userIdMiddleware,
    userController.updateUser
);
router.delete(
    '/:user_id',
    userController.deleteAccount
);

module.exports = router;
