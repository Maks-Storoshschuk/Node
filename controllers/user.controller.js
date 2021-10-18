const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find().lean();

            const normUsers = [];
            users.forEach(user => {
                const normUser = userUtil.userNormalize(user);

                normUsers.push(normUser);
            });

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: (req, res, next) => {
        try {
            const user = userUtil.userNormalize(req.user);

            res.json(user);
        } catch (e) {
            next(e);
        }

    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const freshUser = req.body;
            const user = await User.findByIdAndUpdate(user_id, freshUser, {new: true}).lean();

            const newUser = userUtil.userNormalize(user);

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await passwordService.hash(req.body.password);

            const user = await User
                .create({...req.body, password: hashPassword});

            const normUser = userUtil.userNormalize(user.toObject());

            res.json(normUser);
        } catch (e) {
            next(e);

        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const id = req.user._id;
            await User.findByIdAndDelete(id);

            res.json('User is dead');
        } catch (e) {
            next(e);
        }
    },
};
