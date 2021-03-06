const {jwtService, emailService, passwordService} = require('../services');
const {O_auth, User, Action_Forgot} = require('../dataBase');
const {constants, tokenTypeEnum} = require('../config');

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            const user = req.user;
            const {password} = req.body;
            await user.comparePassword(password);

            await O_auth.create({
                ...tokenPair,
                user_id: user._id
            });

            const normUser = user.userNormalizer(user);

            res.json({
                normUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const token = req.token;

            await O_auth.deleteOne({access_token: token});

            res.json('log in');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refresh_token, user_id} = req.user;

            await O_auth.deleteOne({refresh_token});

            const tokenPair = jwtService.generateTokenPair();

            await O_auth.create({
                ...tokenPair,
                user_id
            });

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const {_id} = req.user;
            await User.updateOne({_id}, {is_active: true});

            res.status.json('User is active');
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const{_id,email} = req.user;

            const actionToken = jwtService.createActionToken(tokenTypeEnum.ACTION_FORGOT);

            await Action_Forgot.create({
                token: actionToken,
                type: tokenTypeEnum.ACTION_FORGOT,
                user_id: _id,

            });

            await emailService.sendMail(email, constants.FORGOT_PASSWORD, {actionToken});

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            const {newPassword, user_id} = req.body;
            const hashedPassword = await passwordService.hash(newPassword);

            await User.updateOne({_id:user_id}, {password: hashedPassword});

            await O_auth.deleteMany({user_id});

            await Action_Forgot.deleteMany({user_id});

            res.json('new password are saved');
        } catch (e) {
            next(e);
        }
    },
};
