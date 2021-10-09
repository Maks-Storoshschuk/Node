const User = require('../dataBase/User');

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const checkId = await User.findById(user_id);

            if (!checkId) {
                throw new Error('Wrong id');
            }

            req.user = checkId;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};


