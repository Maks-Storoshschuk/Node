const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');


module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();

            const normUsers = [];
            users.forEach(user => {
                const normUser = userUtil.userNormalize(user);

                normUsers.push(normUser);
            });

            res.json(normUsers);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUsersById: (req, res) => {
        const user = userUtil.userNormalize(req.user);

        res.json(user);
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const freshUser = req.body;
            const user = await User.findByIdAndUpdate(user_id, freshUser, {new: true}).lean();

            const newUser = userUtil.userNormalize(user);
            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashPassword = await passwordService.hash(req.body.password);

            const user = await User
                .create({...req.body, password: hashPassword});

            const normUser = userUtil.userNormalize(user);
            res.json(normUser);
        } catch (e) {
            res.json(e.message);

        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndDelete(user_id).lean();
            const newUser = userUtil.userNormalize(user);

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },
};
