const User = require('../dataBase/User');
const {authValidator} = require('../validators');
const {passwordService, jwtService} = require('../services');
const {ErrorBuilder, Errors} = require('../errorHandler');
const {AUTHORIZATION} = require('../config/regExp');
const {tokenTypeEnum} = require('../config');
const O_auth = require('../dataBase/O_auth');
const userUtil = require('../util/user.util');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                ErrorBuilder(Errors.err422);
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
                ErrorBuilder(Errors.err404);
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
                ErrorBuilder(Errors.err403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                ErrorBuilder(Errors.err401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_auth.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse) {
                ErrorBuilder(Errors.err401);
            }

            req.user = userUtil.userNormalize(tokenResponse.user_id.toObject());

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                ErrorBuilder(Errors.err401);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_auth.findOne({refresh_token: token}).populate('user_id');

            if (!tokenResponse) {
                ErrorBuilder(Errors.err401);
            }

            await O_auth.remove({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
