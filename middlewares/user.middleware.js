const User = require('../dataBase/User');
const {userValidator} = require('../validators');
const {ErrorBuilder, Errors} = require('../errorHandler');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                ErrorBuilder(Errors.err409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                ErrorBuilder(Errors.err422ID);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};


