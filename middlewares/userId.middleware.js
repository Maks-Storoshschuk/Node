const {Errors, ErrorBuilder} = require('../errorHandler');
const {User} = require('../dataBase');
const {updateValidator} = require('../validators');

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const checkId = await User.findById(user_id);

            if (!checkId) {
                ErrorBuilder(Errors.err404WI);
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
                ErrorBuilder(Errors.err400BR);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};


