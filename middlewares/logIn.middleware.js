const User = require('../dataBase/User');

module.exports = {
    logInMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const checkEmail = await User.findOne({email});

            if (!checkEmail) {
                throw new Error('Wrong email or password');
            }

            const checkPassword = await User.findOne({email}).findOne({password});

            if (!checkPassword) {
                throw new Error('Wrong email or password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
