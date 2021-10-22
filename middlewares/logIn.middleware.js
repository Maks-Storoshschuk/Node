const {Action_Forgot} = require("../dataBase");
const {authValidator, newPasswordValidator} = require('../validators');
const {AUTHORIZATION} = require('../config/regExp');
const {ErrorBuilder, Errors} = require('../errorHandler');
const {O_auth, User, Action} = require('../dataBase');
const {jwtService} = require('../services');
const {tokenTypeEnum, regExp} = require('../config');

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
                .findOne({email});

            if (!checkEmail) {
                ErrorBuilder(Errors.err404);
            }

            req.user = checkEmail;

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

            const tokenResponse = await O_auth.findOne({access_token: token});

            if (!tokenResponse) {
                ErrorBuilder(Errors.err401);
            }

            req.token = token;
            req.user = tokenResponse.user_id.userNormalizer(tokenResponse.user_id);

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

            const tokenResponse = await O_auth.findOne({refresh_token: token});

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

    isNewPasswordValid: (req, res, next) => {
        try {
            const {newPassword} = req.body;
            const {error, value} = newPasswordValidator.newPasswordValidator.validate({newPassword});

            if (error) {
                ErrorBuilder(Errors.err422);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkNewData: async (req, res, next) => {
        try {
            const actionToken = req.get(regExp.AUTHORIZATION);

            const {newPassword} = req.body;

            if (!actionToken || !newPassword) {
                ErrorBuilder(Errors.err401);
            }

            await jwtService.verifyToken(actionToken, tokenTypeEnum.ACTION_FORGOT);

            const checkAT = await Action_Forgot.findOne({token: actionToken});

            if (!checkAT) {
                ErrorBuilder(Errors.err401);
            }

            req.body = {actionToken, newPassword};

            next();
        } catch (e) {
            next(e);
        }
    },

};
