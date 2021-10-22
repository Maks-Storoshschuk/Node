const jwt = require('jsonwebtoken');

const {ErrorBuilder, Errors} = require('../errorHandler');
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACTION_SECRET,
    JWT_ACTION_FORGOT_SECRET
} = require('../config/config');
const {tokenTypeEnum} = require('../config');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret = '';
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case tokenTypeEnum.ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;
                case tokenTypeEnum.ACTION_FORGOT:
                    secret = JWT_ACTION_FORGOT_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            ErrorBuilder(Errors.err401);
        }
    },
    createActionToken: (type) => {
        let SECRET;
        switch (type) {

            case tokenTypeEnum.ACTION:
                SECRET = JWT_ACTION_SECRET;
                break;

            case tokenTypeEnum.ACTION_FORGOT:
                SECRET = JWT_ACTION_FORGOT_SECRET;
                break;

            default:
                ErrorBuilder(Errors.err500);

        }
        return jwt.sign({}, SECRET, {expiresIn: '1d'});
    }
};
