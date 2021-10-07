const {read,deleteUser,addUser} = require('../users/user.function');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const allUsers = await read();
            res.json(allUsers);
        } catch (e) {
            console.log(e);
        }
    },

    getUsersById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const users = await read();
            const user = users.filter(users => users.id === +user_id);
            res.json(user);
        } catch (e) {
            console.log(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUsers = await addUser(req.body);
            res.json(newUsers);
        } catch (e) {
            console.log(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const usersWithout = await deleteUser(user_id);
            res.json(usersWithout);
        } catch (e) {
            console.log(e);
        }
    }
};
