const {jwtService} = require('../services');
const {O_auth, User} = require('../dataBase');
const userUtil = require('../util/user.util');
const {constants} = require('../config');

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            const user = userUtil.userNormalize(req.user);

            await O_auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const token = req.token;

            await O_auth.findOneAndDelete({access_token: token});

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
            await User.updateOne({_id},{is_active:true});

            res.status(constants.code200)
                .json('User is active');
        } catch (e){
            next(e);
        }
    }
};
