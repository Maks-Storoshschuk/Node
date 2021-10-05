module.exports = {
    getUsers:(req, res) =>{
        res.json('get users');
    },
    createUser:(req, res) =>{
        res.json('create user');
    },
    updateUser:(req, res) =>{
        res.json('update user');
    },
    deleteUser:(req, res) =>{
        res.json('delete user');
    }
}