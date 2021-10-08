const User = require('../dataBase/User');

module.exports = {
    logInMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const checkId = await User.findById(user_id);
            if (!checkId) {
                throw new Error('Wrong id');
            }

            const checkPassword = await User.findById(user_id).findOne({password: req.body.password});
            if (!checkPassword) {
                throw new Error('Wrong password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
