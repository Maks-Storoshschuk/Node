const jwt = require('jsonwebtoken');

const {ErrorBuilder, Errors} = require('../errorHandler');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../config/config');
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
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            ErrorBuilder(Errors.err401);
        }
    }
};
