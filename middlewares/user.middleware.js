const User = require('../dataBase/User');
const {userValidator} = require('../validators');
const ErrorHandler = require('../errorHandler/errorHandler');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler('Email already exists', 400);
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
                throw new ErrorHandler('Invalid data', 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};


