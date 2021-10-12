const router = require('express').Router();

const {authController} = require('../controllers');
const {logInMiddleware} = require('../middlewares');
const {constants} = require('../config');

router.post(
    '/',
    logInMiddleware.isAuthValid,
    logInMiddleware.logInMiddleware,
    logInMiddleware.checkUserRole(constants.USER),
    logInMiddleware.checkPasswordMiddleware,
    authController.logIn
);

router.post(
    '/admin',
    logInMiddleware.isAuthValid,
    logInMiddleware.logInMiddleware,
    logInMiddleware.checkUserRole(constants.ADMIN),
    logInMiddleware.checkPasswordMiddleware,
    authController.logIn
);

router.post(
    '/logOut',
    authController.logOut
);


module.exports = router;
