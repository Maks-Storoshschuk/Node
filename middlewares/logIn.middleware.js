const User = require('../dataBase/User');

module.exports = {
    logInMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const checkEmailAndPassword = await User.findOne({email, password});

            if (!checkEmailAndPassword) {
                throw new Error('Wrong email or password');
            }

            req.user=checkEmailAndPassword;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
