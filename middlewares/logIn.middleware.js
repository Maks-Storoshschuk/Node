const User = require('../dataBase/User');
const {authValidator} = require('../validators');
const passwordService = require('../services/password.service');
const ErrorHandler = require('../errorHandler/errorHandler');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler('Invalid email or password', 404);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    logInMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const checkEmail = await User
                .findOne({email})
                .lean();

            if (!checkEmail) {
                throw new ErrorHandler('Wrong email or password', 404);
            }

            req.user = checkEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordMiddleware: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler('Access denied', 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

};
