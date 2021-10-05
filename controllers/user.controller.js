const util = require('util');
const fs =require('fs');
const utilReadFilePromise =util.promisify(fs.readFile)
const path = require('path')

async function read(){
    const buffer = await utilReadFilePromise(path.join(__dirname,'users.json'))
    return JSON.parse(buffer.toString());
}

async function readByID(id){
    const buffer = await utilReadFilePromise(path.join(__dirname,'users.json'))
    return JSON.parse(buffer.toString())[id];
}

async function deleteUser(id){
    const buffer = await utilReadFilePromise(path.join(__dirname,'users.json'));
    const oldUsersArray = JSON.parse(buffer.toString());
    const newUsersArray = oldUsersArray.filter(oldUsersArray=>oldUsersArray.id !== +id);
    fs.writeFile(path.join(__dirname,'users.json'),`${JSON.stringify(newUsersArray)}`,err => {
        if (err){
            console.log(err);
        }
        return err;
    })
    return newUsersArray;
}

module.exports = {
    getUsers:(req, res) =>{
      read().then(users => res.json(users))
    },

    getUsersById:(req, res) =>{
        const {user_id} = req.params;
        const id = user_id -1
        readByID(id).then(value => res.json(value))
    },

    createUser:(req, res) =>{
        console.log(req.body);
        db.push({...req.body, id: db.length +1})
        res.json('create user');
    },

    deleteUser:(req, res) =>{
        const {user_id} = req.params;
        deleteUser(user_id).then(users => res.json(users))
    }
}