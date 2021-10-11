const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const userIdMiddleware = require('../middlewares/userId.middleware');

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
