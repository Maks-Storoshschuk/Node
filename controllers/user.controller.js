const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUsersById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const user =await User.create(req.body);
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    auth: async (req, res) => {
        try {
            await User.create(req.body);
            res.json(req.body);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndDelete(user_id);
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    }
};
