const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);

        } catch (e) {

            res.json(e.message);

        }
    },

    getUsersById: (req, res) => {
        try {

            res.json(req.user);

        } catch (e) {

            res.json(e.message);

        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);

            res.json(user);

        } catch (e) {

            res.json(e.message);

        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndDelete(user_id);

            res.json(user);

        } catch (e) {

            res.json(e.message);

        }
    },
};
