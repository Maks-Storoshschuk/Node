const User = require('../dataBase/User');
const {updateValidator} = require('../validators');
const ErrorHandler = require('../errorHandler/errorHandler');


module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const checkId = await User.findById(user_id).lean();

            if (!checkId) {
                throw new ErrorHandler('Wrong id', 404);
            }

            req.user = checkId;

            next();
        } catch (e) {
            next(e);
        }
    },

    updateValid: (req, res, next) => {
        try {
            const {error, value} = updateValidator.updateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler('Bad request', 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};


