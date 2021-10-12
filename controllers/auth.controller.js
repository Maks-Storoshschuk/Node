const userUtil = require('../util/user.util');
const User = require('../dataBase/User');

module.exports = {
    logIn: (req, res, next) => {
        try {
            const user = userUtil.userNormalize(req.user);

            res.json(user);
        } catch (e) {
            next(e);
        }


    },

    logOut: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    }
};
