const {constants, tokenTypeEnum} = require('../config');
const {emailService, jwtService, S3services} = require('../services');
const userService = require('../services/user.service');
const {User, Action, O_auth} = require('../dataBase');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normUsers = [];
            users.forEach(user => {
                const normUser = user.userNormalizer(user);

                normUsers.push(normUser);
            });

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: (req, res, next) => {
        try {
            const user = req.user;

            const normUser = user.userNormalizer(user);

            res.json(normUser);
        } catch (e) {
            next(e);
        }

    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const freshUser = req.body;
            const user = await User.findByIdAndUpdate(user_id, freshUser, {new: true});

            const newUser = user.userNormalizer(user);

            res.status(constants.code201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            let user = await User.createUserWithHashPassword(req.body);

            const token = jwtService.createActionToken(tokenTypeEnum.ACTION);

            await Action.create({token, type: tokenTypeEnum.ACTION, user_id: user._id});

            await emailService.sendMail(req.body.email, constants.welcome, {userName: req.body.name, token});

            const {avatar} = req.files;

            if (avatar){
                const uploadInfo= await S3services.uploadImage(avatar, 'users', user._id.toString());

                user = await User.findByIdAndUpdate(user._id, {avatar: uploadInfo.Location}, {new:true});
            }

            const normUser = user.userNormalizer(user);

            res.status(constants.code201).json(normUser);
        } catch (e) {
            next(e);

        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            await User.deleteOne({_id: user_id});
            await O_auth.deleteOne({user_id});

            res.sendStatus(constants.code204);
        } catch (e) {
            next(e);
        }
    },
};
