const User = require('../dataBase/User');
const authValidator = require('../validators/auth.validator');
const passwordService = require('../services/password.service');

module.exports = {
    logInMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const checkEmailAndPassword = await User
                .findOne({email})
                .lean()
                .select('+password');

            await passwordService.compare(password, checkEmailAndPassword.password);

            if (!checkEmailAndPassword) {
                throw new Error('Wrong email or password');
            }

            req.user = checkEmailAndPassword;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
