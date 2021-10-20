const {authValidator} = require('../validators');
const {AUTHORIZATION} = require('../config/regExp');
const {ErrorBuilder, Errors} = require('../errorHandler');
const {O_auth, User, Action} = require('../dataBase');
const {passwordService, jwtService} = require('../services');
const {tokenTypeEnum} = require('../config');
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

            req.token = token;
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

            req.user = tokenResponse;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: async (req, res, next) => {
        try {
            const {token} = req.params;
            await jwtService.verifyToken(token, tokenTypeEnum.ACTION);

            const {user_id: user, _id} = await Action.findOne({token, type: tokenTypeEnum.ACTION}).populate('user_id');

            if (!user) {
                ErrorBuilder(Errors.err401);
            }

            await Action.deleteOne({_id});
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

};
