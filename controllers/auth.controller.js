const userUtil = require('../util/user.util');
const {jwtService} = require('../services');
const oAuth = require('../dataBase/O_auth');

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            const user = userUtil.userNormalize(req.user);

            await oAuth.create({
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

            await oAuth.findOneAndDelete({access_token: token});

            res.json('log in');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refresh_token} = req.user;
            await oAuth.deleteOne({refresh_token});

            res.json('refresh token are deleted');
        } catch (e) {
            next(e);
        }
    }
};
