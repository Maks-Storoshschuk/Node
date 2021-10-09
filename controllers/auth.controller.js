const User = require('../dataBase/User');

module.exports = {
    auth: async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});

            res.json(user);

        } catch (e) {

            res.json(e.message);

        }
    }
};
