const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const logInMiddleware = require('../middlewares/logIn.middleware');

router.post(
    '/',
    logInMiddleware.isAuthValid,
    logInMiddleware.logInMiddleware,
    authController.auth
);

module.exports = router;
