const userUtil = require('../util/user.util');
const {jwtService} = require('../services');
const oAuth = require('../dataBase/O_auth');
const {AUTHORIZATION} = require('../config/regExp');
const {Errors, ErrorBuilder} = require('../errorHandler');

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
            const token = req.get(AUTHORIZATION);

            if (!token) {
                ErrorBuilder(Errors.err401);
            }

            await jwtService.verifyToken(token);

            await oAuth.findOneAndDelete({access_token: token});

            res.json('log in');
        } catch (e) {
            next(e);
        }
    }
};
