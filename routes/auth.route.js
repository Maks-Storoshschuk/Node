const router = require('express').Router();

const {authController} = require('../controllers');
const {logInMiddleware} = require('../middlewares');
const {constants} = require('../config');

router.post(
    '/',
    logInMiddleware.isAuthValid,
    logInMiddleware.logInMiddleware,
    logInMiddleware.checkUserRole([
        constants.USER,
        constants.ADMIN
    ]),
    logInMiddleware.checkPasswordMiddleware,
    authController.logIn
);

router.post(
    '/logOut',
    logInMiddleware.checkAccessToken,
    authController.logOut
);

router.post(
    '/refresh',
    logInMiddleware.checkRefreshToken,
    authController.refreshToken,
);

module.exports = router;
