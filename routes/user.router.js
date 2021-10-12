const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, userIdMiddleware} = require('../middlewares');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserValid,
    userMiddleware.createUserMiddleware,
    userController.createUser
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
    userIdMiddleware.userIdMiddleware,
    userController.deleteUser);

module.exports = router;
