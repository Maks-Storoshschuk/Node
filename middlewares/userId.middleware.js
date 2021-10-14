const User = require('../dataBase/User');
const {updateValidator} = require('../validators');
const {Errors, ErrorBuilder} = require("../errorHandler");


module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const checkId = await User.findById(user_id).lean();

            if (!checkId) {
                ErrorBuilder(Errors.err400);
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


